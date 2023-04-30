import React, { useState } from 'react';
import styles from './FilterSearch.module.css';
import classNames from 'classnames';
import Select from 'react-select';




const FilterSearch = () => {
  // State variables to store filter criteria
  const [customerId, setCustomerId] = useState("");
  const [genderFilter, setGenderFilter] = useState('');
  const [partnerFilter, setPartnerFilter] = useState('');
  const [dependentsFilter, setDependentsFilter] = useState('');
  const [phoneServiceFilter, setPhoneServiceFilter] = useState('');
  const [internetServiceFilter, setInternetServiceFilter] = useState('');
  const [contractFilter, setContractFilter] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const decodeCustomerData = (customer) => {
    const decodedData = {
      ...customer,
      gender: customer.gender === 0 ? "Female" : "Male",
      partner: customer.partner === 1 ? "Yes" : "No",
      dependents: customer.dependents === 1 ? "Yes" : "No",
      phoneService: customer.phoneservice === 1 ? "Yes" : "No",
      internetService: ["DSL", "Fiber Optic", "No"][customer.internetservice],
      contract: ["Month-to-month", "One year", "Two year"][customer.contract],
      multipleLines: ["No", "Yes", "No Phone Service"][customer.multiplelines],
      onlineBackup: ["No", "Yes", "No Internet Service"][customer.onlinebackup],
      onlineSecurity: ["No", "Yes", "No Internet Service"][customer.onlinesecurity],
      deviceProtection: ["No", "Yes", "No Internet Service"][customer.deviceprotection],
      paperlessBilling: customer.paperlessbilling === 0 ? "No" : "Yes",
      paymentMethod: ["Electronic Check", "Mailed Check", "Bank Transfer (automatic)", "Credit Card (automatic)"][customer.paymentmethod],
      seniorCitizen: customer.seniorcitizen === 0 ? "No" : "Yes",
      churn: customer.churn === 1 ? "Yes" : "No",
    };

    return decodedData;
  };


  const handleCustomerIdChange = (event) => {
    setCustomerId(event.target.value); // update customerId state when the user inputs a value
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when fetching data
    const filterCriteria = {
      gender: genderFilter ? genderFilter : null,
      partner: partnerFilter ? partnerFilter : null,
      dependents: dependentsFilter ? dependentsFilter : null,
      phoneService: phoneServiceFilter !== '' ? parseInt(phoneServiceFilter) : null,
      internetService: internetServiceFilter !== '' ? parseInt(internetServiceFilter) : null,
      contract: contractFilter ? contractFilter : null,
    };

    try {
      // Fetch data from backend API using filter criteria
      const response = await fetch(
        `http://localhost:4500/api/filter_search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gender: genderFilter ? genderFilter : null,
            partner: partnerFilter ? partnerFilter : null,
            dependents: dependentsFilter ? dependentsFilter : null,
            phoneService: phoneServiceFilter !== '' ? parseInt(phoneServiceFilter) : null,
            internetService: internetServiceFilter !== '' ? parseInt(internetServiceFilter) : null,
            contract: contractFilter ? contractFilter : null,
          }),
        }
      );
      // Inside handleSubmit function, just before the fetch call
      console.log("Sending filters:", {
        gender: genderFilter ? genderFilter : null,
        partner: partnerFilter ? partnerFilter : null,
        dependents: dependentsFilter ? dependentsFilter : null,
        phoneService: phoneServiceFilter !== '' ? phoneServiceFilter : null,
        internetService: internetServiceFilter !== '' ? internetServiceFilter : null,
        contract: contractFilter ? contractFilter : null,
      });


      const data = await response.json();

      // Update the customerList state with the fetched data
      setCustomerList(data);
      console.log(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading state to false when data fetch is complete
    }
  };


  const generateTableRows = () => {
    return customerList.map((customer) => {
      const decodedCustomer = decodeCustomerData(customer);
      return (
        <tr key={decodedCustomer.customerid}>
          <td>{decodedCustomer.customerid}</td>
          <td>{decodedCustomer.gender}</td>
          <td>{decodedCustomer.partner}</td>
          <td>{decodedCustomer.dependents}</td>
          <td>{decodedCustomer.phoneService}</td>
          <td>{decodedCustomer.multipleLines}</td>
          <td>{decodedCustomer.internetService}</td>
          <td>{decodedCustomer.onlineSecurity}</td>
          <td>{decodedCustomer.onlineBackup}</td>
          <td>{decodedCustomer.deviceProtection}</td>
          <td>{decodedCustomer.contract}</td>
          <td>{decodedCustomer.paperlessBilling}</td>
          <td>{decodedCustomer.paymentMethod}</td>
          <td>{decodedCustomer.seniorCitizen}</td>
          <td>{decodedCustomer.monthlycharges}</td>
          <td>{decodedCustomer.totalcharges}</td>
          <td>{decodedCustomer.churn}</td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.container}>
    <h2 className={styles.title}>Filter & Search</h2>
    <form onSubmit={handleSubmit} className={styles.FilterSearch}>

      <div>
        <label htmlFor="customerId">Search by Customer ID:</label>
        <input type="text" id="customerId" value={customerId} onChange={handleCustomerIdChange} />
        <button type="submit" className={classNames(styles.button, styles.searchButton)}>Search</button>
      </div>

        <br />
        <br />

      <div>
        <label htmlFor="gender-filter">Gender:</label>
        <select id="gender-filter" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">Select gender...</option>
          <option value="0">Female</option>
          <option value="1">Male</option>
        </select>
        </div>

        <br />

        <div>
        <label htmlFor="partner-filter">Partner:</label>
        <select id="partner-filter" value={partnerFilter} onChange={(e) => setPartnerFilter(e.target.value)}>
          <option value="">Select partner status...</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        </div>

        <br />

        <div>
        <label htmlFor="dependents-filter">Dependents:</label>
        <select id="dependents-filter" value={dependentsFilter} onChange={(e) => setDependentsFilter(e.target.value)}>
          <option value="">Select dependents status...</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        </div>
        <br />

        <div>
        <label htmlFor="phone-service-filter">Phone Service:</label>
        <select id="phone-service-filter" value={phoneServiceFilter} onChange={(e) => setPhoneServiceFilter(e.target.value)}>
          <option value="">Select phone service status...</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
        </div>

        <br />

        <div>
        <label htmlFor="internet-service-filter">Internet Service:</label>
        <select id="internet-service-filter" value={internetServiceFilter} onChange={(e) => setInternetServiceFilter(e.target.value)}>
          <option value="">Select internet service status...</option>
          <option value="0">DSL</option>
          <option value="1">Fiber Optic</option>
          <option value="2">No</option>
        </select>
        </div>

        <br />

        <div>
        <label htmlFor="contract-filter">Contract:</label>
        <select id="contract-filter" value={contractFilter} onChange={(e) => setContractFilter(e.target.value)}>
          <option value="">Select contract type...</option>
          <option value="0">Month-to-month</option>
          <option value="1">One year</option>
          <option value="2">Two year</option>
        </select>
        </div>

        <br />
        <button type="submit">Search</button>
      </form>
      <br />
      <br />
      <h3 className={styles.customerListTitle}>Customer List</h3>
      {isLoading ? (
        <p>Loading customer data...</p>
      ) : (
        <table className={classNames(styles.table, styles.customerTable)}>
        <thead>
            <tr>
              <th>Customer ID</th>
              <th>Gender</th>
              <th>Partner</th>
              <th>Dependents</th>
              <th>Phone Service</th>
              <th>Multiple Lines</th>
              <th>Internet Service</th>
              <th>Online Security</th>
              <th>Online Backup</th>
              <th>Device Protection</th>
              <th>Contract</th>
              <th>Paperless Billing</th>
              <th>Payment Method</th>
              <th>Senior Citizen</th>
              <th>Monthly Charges</th>
              <th>Total Charges</th>
              <th>Churn</th>
            </tr>
          </thead>
          <tbody>
            {generateTableRows()}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FilterSearch;