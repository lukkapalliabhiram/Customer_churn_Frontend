const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors package
const app = express();
app.use(cors());
const port = process.env.PORT || 4500;

app.use(express.json());

const pool = new Pool({
  user: 'adt_customer_user',
  host: 'dpg-cgrmg182qv2dcb8cco40-a.oregon-postgres.render.com',
  database: 'churn',
  password: 'HV51hS93pim3clhV50zO5c4sLZbk6ryP',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});


function decodeAttribute(attribute, value) {
  const attributeDecoders = {
    gender: { Female: 0, Male: 1 },
    partner: { No: 0, Yes: 1 },
    dependents: { No: 0, Yes: 1 },
    phoneservice: { No: 0, Yes: 1 },
    multiplelines: { No: 0, 'No phone service': 1, Yes: 2 },
    internetservice: { DSL: 0, 'Fiber optic': 1, No: 2 },
    onlinesecurity: { No: 0, 'No internet service': 1, Yes: 2 },
    onlinebackup: { No: 0, 'No internet service': 1, Yes: 2 },
    deviceprotection: { No: 0, 'No internet service': 1, Yes: 2 },
    techsupport: { No: 0, 'No internet service': 1, Yes: 2 },
    streamingtv: { No: 0, 'No internet service': 1, Yes: 2 },
    streamingmovies: { No: 0, 'No internet service': 1, Yes: 2 },
    contract: { 'Month-to-month': 0, 'One year': 1, 'Two year': 2 },
    paperlessbilling: { No: 0, Yes: 1 },
    paymentmethod: {
      'Bank transfer (automatic)': 0,
      'Credit card (automatic)': 1,
      'Electronic check': 2,
      'Mailed check': 3,
    },
    churn: { No: 0, Yes: 1 },
  };

  // Check if a decoder exists for the attribute
  if (attributeDecoders[attribute]) {
    const keys = Object.keys(attributeDecoders[attribute]);
    for (const key of keys) {
      if (attributeDecoders[attribute][key] === value) {
        return key;
      }
    }
  } else {
    // If no decoder exists, return the original value
    return value;
  }

  throw new Error(`Unable to decode attribute "${attribute}" with value "${value}".`);
}


const queryDatabase = async (filterCriteria) => {
  const {
    gender,
    seniorcitizen,
    partner,
    dependents,
    churn,
    paperlessbilling,
    paymentmethod,
    contract,
    tenure,
    phoneservice,
    multiplelines,
    internetservice,
    onlinesecurity,
    onlinebackup,
    deviceprotection,
  } = filterCriteria;

  // SQL query with placeholders for filtering
  const query = `
  SELECT
    c.customerid, c.gender, c.seniorcitizen, c.partner, c.dependents,
    ci.churn,
    pi.paperlessbilling, pi.paymentmethod, pi.monthlycharges, pi.totalcharges,
    pd.contract, pd.tenure, pd.phoneservice, pd.multiplelines, pd.internetservice,
    sd.onlinesecurity, sd.onlinebackup, sd.deviceprotection
  FROM
    customer AS c
    JOIN churn_info AS ci ON c.customerid = ci.customerid
    JOIN payment_info AS pi ON c.customerid = pi.customerid
    JOIN plan_details AS pd ON c.customerid = pd.customerid
    JOIN subscription_details AS sd ON c.customerid = sd.customerid
  WHERE
    ($1::smallint IS NULL OR c.gender = $1)
    AND ($2::smallint IS NULL OR c.seniorcitizen = $2)
    AND ($3::smallint IS NULL OR c.partner = $3)
    AND ($4::smallint IS NULL OR c.dependents = $4)
    AND ($5::smallint IS NULL OR ci.churn = $5)
    AND ($6::smallint IS NULL OR pi.paperlessbilling = $6)
    AND ($7::smallint IS NULL OR pi.paymentmethod = $7)
    AND ($8::smallint IS NULL OR pd.contract = $8)
    AND ($9::smallint IS NULL OR pd.tenure = $9)
    AND ($10::integer IS NULL OR pd.phoneservice = $10)
    AND ($11::smallint IS NULL OR pd.multiplelines = $11)
    AND ($12::integer IS NULL OR pd.internetservice = $12)
    AND ($13::smallint IS NULL OR sd.onlinesecurity = $13)
    AND ($14::smallint IS NULL OR sd.onlinebackup = $14)
    AND ($15::smallint IS NULL OR sd.deviceprotection = $15)
`;

  // Query the database with the provided filter criteria
  console.log('Executing query:', query);
  const { rows } = await pool.query(query, [
    gender,
    seniorcitizen,
    partner,
    dependents,
    churn,
    paperlessbilling,
    paymentmethod,
    contract,
    tenure,
    phoneservice,
    multiplelines,
    internetservice,
    onlinesecurity,
    onlinebackup,
    deviceprotection,
  ]);

  return rows;
};


app.post("/api/filter_search", async (req, res) => {
  try {
    const filterCriteria = req.body;
    const filteredData = await queryDatabase(filterCriteria);
    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    res.status(500).json({ error: "An error occurred while fetching filtered data." });
  }
});

const chartTypes = {
  pie: 1,
  bar: 1,
  scatterplot: 2,
  stackedBar: 2,
  heatmap:2,
  line:2,
  histogram: 2,
  line: 1,
  // Add other chart types and their required number of columns here
};

function getTableAlias(column) {
  const columnTableMap = {
    gender: 'c',
    seniorcitizen: 'c',
    partner: 'c',
    dependents: 'c',
    churn: 'ci',
    paperlessbilling: 'pi',
    paymentmethod: 'pi',
    monthlycharges: 'pi',
    totalcharges: 'pi',
    contract: 'pd',
    tenure: 'pd',
    phoneservice: 'pd',
    multiplelines: 'pd',
    internetservice: 'pd',
    onlinesecurity: 'sd',
    onlinebackup: 'sd',
    deviceprotection: 'sd',
    techsupport: 'sd',
    streamingtv: 'sd',
    streamingmovies: 'sd',
  };

  const alias = columnTableMap[column];
  if (!alias) {
    throw new Error(`Unknown column: ${column}`);
  }
  return alias;
}





async function fetchDataForChart(chartType, columns) {
  const data = [];
  const options = {};

  try {
    const selectClause = columns.map(column => `${getTableAlias(column)}.${column}`).join(', ');

    const query = `
      SELECT ${selectClause}, COUNT(c.customerid) as count
      FROM customer AS c
      JOIN churn_info AS ci ON c.customerid = ci.customerid
      JOIN payment_info AS pi ON c.customerid = pi.customerid
      JOIN plan_details AS pd ON c.customerid = pd.customerid
      JOIN subscription_details AS sd ON c.customerid = sd.customerid
      WHERE ci.churn = 1
      GROUP BY ${selectClause}
      ORDER BY ${selectClause} ASC
    `;

    console.log('Generated query:', query);

    const { rows } = await pool.query(query);

    for (const row of rows) {
      const decodedRow = {
        count: row.count,
      };
    
      columns.forEach(column => {
        decodedRow[column] = decodeAttribute(column, row[column]);
      });
    
      data.push(decodedRow);
    }
    

    if (columns.length === 2) {
      options.title = chartType === 'scatter' ? `${chartType} of ${columns[0]} vs ${columns[1]}` : `${chartType} of ${columns[0]} and ${columns[1]}`;
    } else {
      options.title = `${chartType} of ${columns[0]}`;
    }

  } catch (error) {
    console.error('Error fetching data for chart:', error);
    throw error;
  }
  console.log(data)
  return { data, options };
}






app.post('/data', async (req, res) => {
  const { chartType, column1, column2 } = req.body;

  try {
    const columns = column2 ? [column1, column2] : [column1];
    const { data, options } = await fetchDataForChart(chartType, columns);

    // Update count property to be a number instead of a string
    const formattedData = data.map(item => {
      const formattedItem = {};
      columns.forEach(column => {
        formattedItem[column] = item[column];
      });
      formattedItem.count = parseInt(item.count);
      return formattedItem;
    });

    res.json({ data: formattedData, options });
  } catch (error) {
    console.error('Error fetching data for chart:', error);
    res.status(500).json({ error: 'An error occurred while fetching data for the chart.' });
  }
});


const findLatestCustomer = async() => {
  query = `SELECT c.customerid as customerId from customer c ORDER BY c.customerid DESC LIMIT 1`;
  const result = await pool.query(query);
  console.log("in find latest");
  console.log(result.rows);
  return result.rows[0].customerid;
};


async function createCustomer(lastCustId,input){
  query1 = `INSERT INTO customer (customerid, gender, seniorcitizen, partner, dependents)
  VALUES ($1, $2, $3, $4, $5);`;
    console.log('Executing Insert Customer query:', query1);
    const { rows } = await pool.query(query1, [
      lastCustId+1,
      input.gender,
      input.sc,
      input.partner,
      input.dependents
    ]);
    newCustId = lastCustId+1;

    query2 = `INSERT INTO churn_info (customerid, churn)
    VALUES ($1, $2);`
    console.log('Executing Insert Churn query:', query2);
    await pool.query(query2, [
      newCustId,
      input.churn
    ]);
    
    query3 = `INSERT INTO plan_details (customerid, contract, tenure, phoneservice, multiplelines, internetservice)
    VALUES ($1, $2, $3, $4, $5, $6);`
    console.log('Executing Insert plan details query:', query3);
    await pool.query(query3, [
      newCustId,
      input.contract,
      input.Tenure,
      input.phone,
      input.ml,
      input.internet
    ]);

    query4  = `INSERT INTO payment_info (customerid, paperlessbilling, paymentmethod, monthlycharges, totalcharges)
    VALUES ($1, $2, $3, $4, $5);`
    console.log('Executing Insert payment details query:', query4);
    await pool.query(query4, [
      newCustId,
      input.ppb,
      input.payMethod,
      input.monthlyCharges,
      input.totalCharges
    ]);

    query5 = `INSERT INTO subscription_details (customerid, onlinesecurity, onlinebackup, deviceprotection, techsupport, streamingtv, streamingmovies)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`
    console.log('Executing Insert subscription details query:', query5);
    await pool.query(query5, [
      newCustId,
      input.osl,
      input.backup,
      input.devpro,
      input.techSupport,
      input.tv,
      input.movies
    ]);
    return newCustId;
}

app.post("/api/create", async(req,res)=>{
  try {
    const lastCustId = await findLatestCustomer();
    console.log("LastCustId"+lastCustId);
    input = req.body;
    const newCustomerId = await createCustomer(lastCustId,input);
    res.status(200).json({ customerId: newCustomerId});
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "An error occurred while inserting data"});
  }
});


app.post("/api/customers/get",async(req,res)=>{
  const customer = req.body.customerId;  
  console.log(customer);
  query = `SELECT
  c.customerid as customerid, c.gender as gender, c.seniorcitizen as seniorCitizen, c.partner as partner, c.dependents as dependents,
  ci.churn as churn,
  pi.paperlessbilling as paperlessbilling, pi.paymentmethod as paymentMethod, pi.monthlycharges as monthlyCharges, pi.totalcharges as totalCharges,
  pd.contract as contract, pd.tenure as tenure, pd.phoneservice as phoneService, pd.multiplelines as multipleLines, pd.internetservice as interentService,
  sd.onlinesecurity as onlineSecurity, sd.onlinebackup as onlineBackup, sd.deviceprotection as deviceProtection, sd.techsupport as techSupport, sd.streamingtv as TV, sd.streamingmovies as movies
FROM
  customer AS c
  JOIN churn_info AS ci ON c.customerid = ci.customerid
  JOIN payment_info AS pi ON c.customerid = pi.customerid
  JOIN plan_details AS pd ON c.customerid = pd.customerid
  JOIN subscription_details AS sd ON c.customerid = sd.customerid
  WHERE c.customerid = $1`;
const {rows} = await pool.query(query,[customer]);
console.log(rows);
res.status(200).json(rows[0]);
});

app.post("/api/customer/update",async(req,res)=>{
  const {
    gender,
    seniorCitizen,
    partner,
    dependents,
    customerId,
    phoneService,
    multipleLines,
    internetService,
    tenure,
    onlineSecurity,
    onlineBackup,
    deviceProtection,
    techSupport,
    streamingTV,
    streamingMovies,
    contract,
    paperlessBilling,
    paymentMethod,
    monthlyCharges,
    totalCharges,
    churn,
  } = req.body;
      // Update customer
      const customerQuery = `
      UPDATE customer SET
        gender = $1,
        seniorcitizen = $2,
        partner = $3,
        dependents = $4
      WHERE customerid = $5`;
      await pool.query(customerQuery,[gender,
        seniorCitizen,
        partner,
        dependents,
        customerId]);

      const chUpdate = `UPDATE churn_info SET
        churn = $1
      WHERE customerid = $2`;
      await pool.query(chUpdate,[churn,customerId])

      const payUpdate = `UPDATE payment_info SET
        paperlessbilling = $1,
        paymentmethod = $2,
        monthlycharges = $3,
        totalcharges = $4
      WHERE customerid = $5`;
      await pool.query(payUpdate, [paperlessBilling,
        paymentMethod,
        monthlyCharges,
    totalCharges,customerId
      ])

      const planUpdate = `UPDATE plan_details SET
        contract = $1,
        phoneservice = $2,
        multiplelines = $3,
        internetservice = $4,
        tenure = $5
      WHERE customerid = $6`;
      await pool.query(planUpdate,[contract,phoneService,multipleLines,
        internetService,tenure,customerId])

      const subsUpdate = `UPDATE subscription_details SET
        onlinesecurity = $1,
        onlinebackup = $2,
        deviceprotection = $3,
        techsupport = $4,
        streamingtv = $5,
        streamingmovies = $6
      WHERE customerid = $7 ;
    `;
    await pool.query(subsUpdate,[
      onlineSecurity,
      onlineBackup,
      deviceProtection,
      techSupport,
      streamingTV,
      streamingMovies,customerId])
      res.status(200).json({'success':true});
});

app.post("/api/customer/delete",async(req,res)=>{
  const customerId = req.body.customerId;
  const delete1 = `DELETE FROM subscription_details WHERE customerid = $1;`;
  await pool.query(delete1,[customerId]);
  const delete2 = `DELETE FROM plan_details WHERE customerid = $1;`;
  await pool.query(delete2,[customerId]);
  const delete3 = ` DELETE FROM payment_info WHERE customerid = $1;`;
  await pool.query(delete3,[customerId]);
  const delete4 = `DELETE FROM churn_info WHERE customerid = $1;`;
  await pool.query(delete4,[customerId]);
  const delete5 = `DELETE FROM customer WHERE customerid = $1`;
  await pool.query(delete5,[customerId]);
  res.status(200).json({'success':true});
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
