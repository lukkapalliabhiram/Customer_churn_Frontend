
import React, { useState } from 'react';
import image from '../images/download.jpeg';
import image1 from '../images/b6.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api copy';

const DataEntry = () => {
    const [fgender, setGender] = useState('');
    const [fsc,setSc] = useState('');
    const [fpartner,setPartner] = useState('');
    const[fdep,setFdep] = useState('');
    const[contract, setContract] = useState('');
    const[tenure, setTenure] = useState('');
    const[phone, setPhone] = useState('');
    const[ml,setml] = useState('');
    const[internet,setInternet] = useState('');
    const[osl,setosl] = useState('');
    const[obackup,setobackup] = useState('');
    const[devprotect,setdevprotect] = useState('');
    const[techsupport,setTechSupport] = useState('');
    const[tv,setTV] = useState('');
    const[movies,setMovies] = useState('');
    const[ppb,setPPB] = useState('');
    const[payMethod,setPayMethod] = useState('');
    const[monthlyCharge,setMonthlyCharge] = useState('');
    const[totalCharges,settotal] = useState('');
    const[churn,setChurn] = useState('');


const gender = {
    'Female': 0,
'Male': 1
}

const sc = {
    'No': 0,
'Yes': 1
}

const partner = {
    'No': 0,
'Yes': 1
}

const dependents = {
    'No': 0,
    'Yes': 1
}

const PhoneService = {
    'No': 0,
    'Yes': 1
}

const MultipleLines = {
    'No': 0,
    'No phone service': 1,
    'Yes': 2
}

const InternetService = {
    'DSL': 0,
'Fiber optic': 1,
'No': 2
}

const onlineSecurity = {
    'No': 0,
'No internet service': 1,
'Yes': 2
}

const OnlineBackup = {
    'No': 0,
'No internet service': 1,
'Yes': 2
}

const DeviceProtection = {
'No': 0,
'No internet service': 1,
'Yes': 2
}


const TechSupport = {
'No': 0,
'No internet service': 1,
'Yes': 2
}


const StreamingTV = {
'No': 0,
'No internet service': 1,
'Yes': 2
}


const StreamingMovies = {
    'No': 0,
'No internet service': 1,
'Yes': 2
}

const Contract = {
    'Month-to-month': 0,
'One year': 1,
'Two year': 2
}

const PaperlessBilling = {
    'No': 0,
'Yes': 1
}

const PaymentMethod = {
    'Bank transfer (automatic)': 0,
'Credit card (automatic)': 1,
'Electronic check': 2,
'Mailed check': 3
}

const CustomerIDForm = ({ onCustomerIDSubmit }) => {
    const [customerID, setCustomerID] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onCustomerIDSubmit(customerID);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Customer ID:
          <input
            type="text"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };

const clearForm = () => {
    setGender('');
    setSc('');
    setPartner('');
    setFdep('');
    setContract('');
    setTenure('');
    setPhone('');
    setml('');
    setInternet('');
    setosl('');
    setobackup('');
    setdevprotect('');
    setTechSupport('');
    setTV('');
    setMovies('');
    setPPB('');
    setPayMethod('');
    setMonthlyCharge('');
    settotal('');
    setChurn('');
}


const Churn = {
'No': 0,
'Yes': 1
}

const handleSubmit= (event) =>{
    event.preventDefault();
    console.log("Entered Submit");
   // toast.success("Hi");
    if(!fgender){
        toast.error('Please select gender');
        return;
    }
    if(!fsc){
        toast.error('Please select whether you are a senior citizen');
        return;
    }
    if(!fpartner){
        toast.error('Please select partner details');
        return;
    }
    if(!fdep){
        toast.error('Please select dependent details');
        return;
    }
    if(!contract){
        toast.error('Please select contract details');
        return;
    }
    if(!phone){
        toast.error('Please select gender');
        return;
    }
    if(!ml){
        toast.error('Please select phone details');
        return;
    }
    if(!internet){
        toast.error('Please select gender');
        return;
    }
    if(!tenure){
        toast.error('Please enter tenure');
        return;
    }
    if(!osl){
        toast.error('Please select online security service details');
        return;
    }
    if(!obackup){
        toast.error('Please select online backup details');
        return;
    }

    if(!devprotect){
        toast.error('Please select device protection details');
        return;
    }
    if(!techsupport){
        toast.error('Please select tech support details');
        return;
    }
    if(!tv){
        toast.error('Please select TV service details');
        return;
    }
    if(!movies){
        toast.error('Please select movie details');
        return;
    }
    if(!ppb){
        toast.error('Please select paperless billing details');
        return;
    }
    if(!payMethod){
        toast.error('Please select payment method details');
        return;
    }
    if(!monthlyCharge){
        toast.error('Please enter monthly charges');
        return;
    }
    if(!totalCharges){
        toast.error('Please enter total charges');
        return;
    }
    if(!churn){
        toast.error('Please select churn details');
        return;
    }



    const data = {
        'gender': parseInt(fgender),
        'sc':parseInt(fsc),
        'partner':parseInt(fpartner),
        'dependents':parseInt(fdep),
        'contract':parseInt(contract),
        'phone':parseInt(phone),
        'ml': parseInt(ml),
        'internet':parseInt(internet),
        'Tenure':parseInt(tenure),
        'osl':parseInt(osl),
        'backup':parseInt(obackup),
        'devpro':parseInt(devprotect),
        'techSupport':parseInt(techsupport),
        'tv':parseInt(tv),
        'movies':parseInt(movies),
        'ppb':parseInt(ppb),
        'payMethod':parseInt(payMethod),
        'monthlyCharges':parseFloat(monthlyCharge),
        'totalCharges':parseFloat(totalCharges),
        'churn':parseInt(churn)

    }
    console.log(data);
    toast.success('Data added successfully');
    api
      .post('http://localhost:4500/api/create', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    

}

//style={{backgroundImage:`url(${image})`}}
return(
    <div style={{backgroundImage:`url(${image1})`,height:'1700px'}}>
    <div style={{width:'450px',height:'1000px',marginLeft:'30rem'}}>
    <form  style={{backgroundImage:`url(${image})`}}>
        <div>
            <h2 style={{marginBottom:'40px'}}>1 - Enter new customer details</h2>
        <div  style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Gender : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={fgender} onChange={(e) => setGender(e.target.value)} defaultValue={'Female'}>
            <option>Select Gender</option>
        <option value='1' >Male</option>
        <option value='0'>Female</option>
        
         </select>
        </div>

        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Senior Citizen : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={fsc} onChange={(e) => setSc(e.target.value)}>
            <option>Select</option>
        <option value='1' >Yes</option>
        <option value='0'>No</option>
         </select>
        </div>

        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}}  >Partner: </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={fpartner} onChange={(e) => setPartner(e.target.value)}>
            <option>Select</option>
        <option value='1'>Yes</option>
        <option value='0'>No</option>
         </select>
        </div>

        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Dependents : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={fdep} onChange={(e) => setFdep(e.target.value)}>
            <option>Select</option>
        <option value='1'>Yes</option>
        <option value='0'>No</option>
         </select>
        </div>
        </div>
        <div>
            <h2 style={{margin:'40px'}}>2 - Enter Plan details</h2>
            <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Contract : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={contract} onChange={(e) => setContract(e.target.value)}>
            <option>Select</option>
        <option value='1'>Month-to-month</option>
        <option value='0'>One year</option>
        <option value='2'>Two year</option>
         </select>
        </div>

        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} > PhoneService : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={phone} onChange={(e) => setPhone(e.target.value)}>
            <option>Select</option>
        <option value='1'>Yes</option>
        <option value='0'>No</option>
         </select>
        </div>

        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >MultipleLines  : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={ml} onChange={(e) => setml(e.target.value)}>
            <option>Select</option>
        <option value='2'>Yes</option>
        <option value='0'>No</option>
        <option value='1'>No phone service</option>
         </select>
        </div>


        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} > IntenetService  : </label>
            <select   style={{margin:10,minWidth: '100px', height: '30px' }} value={internet} onChange={(e) => setInternet(e.target.value)}>
            <option>Select</option>
        <option value='1'>Fiber optic</option>
        <option value='0'>DSL</option>
        <option value='2'>No</option>
         </select>
        </div>

        <div style={{margin:10}}>
          <label  style={{paddingRight:'40px'}}>Tenure :</label>
          <input type="text" value={tenure} onChange={(e) => setTenure(e.target.value)}></input>
        </div>

        </div>

        <div>
        <h2 style={{margin:'40px'}}>3 - Enter Subscription details</h2>


        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Online Security Services  : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={osl} onChange={(e) => setosl(e.target.value)}>
            <option>Select</option>
        <option value='2'>Yes</option>
        <option value='0'>No</option>
        <option value='1'>No internet service</option>
         </select>
        </div>

        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Online Backup  : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={obackup} onChange={(e) => setobackup(e.target.value)}>
            <option>Select</option>
        <option value='2'>Yes</option>
        <option value='0'>No</option>
        <option value='1'>No internet service</option>
         </select>
        </div>


        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Device Protection  : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={devprotect} onChange={(e) => setdevprotect(e.target.value)}>
            <option>Select</option>
        <option value='2'>Yes</option>
        <option value='0'>No</option>
        <option value='1'>No internet service</option>
         </select>
        </div>

        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Tech Support  : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={techsupport} onChange={(e) => setTechSupport(e.target.value)}>
            <option>Select</option>
        <option value='2'>Yes</option>
        <option value='0'>No</option>
        <option value='1'>No internet service</option>
         </select>
        </div>

        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Streaming TV Services  : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={tv} onChange={(e) => setTV(e.target.value)}>
            <option>Select</option>
        <option value='2'>Yes</option>
        <option value='0'>No</option>
        <option value='1'>No internet service</option>
         </select>
        </div>

        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Streaming Movie Services  : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={movies} onChange={(e) => setMovies(e.target.value)}>
            <option>Select</option>
        <option value='2'>Yes</option>
        <option value='0'>No</option>
        <option value='1'>No internet service</option>
         </select>
        </div>

        </div>


        <div>
        <h2 style={{margin:'40px'}}>4 - Enter Payment Details</h2>
        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >PaperlessBilling  : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={ppb} onChange={(e) => setPPB(e.target.value)}>
            <option>Select</option>
            <option value='1'>Yes</option>
        <option value='0'>No</option>
         </select>
        </div>

        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >PaymentMethod  : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
            <option>Select</option>
            <option value='1'>Credit card (automatic)</option>
        <option value='0'>Bank transfer (automatic)</option>
        <option value = '2'>Electronic check</option>
        <option value='3'>Mailed check</option>
         </select>
        </div>

        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Monthly Charges  : </label>
            <input type="text" value={monthlyCharge} onChange={(e) => setMonthlyCharge(e.target.value)}></input>
        </div>

        <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Total Charges  : </label>
            <input type="text" value={totalCharges} onChange={(e) => settotal(e.target.value)}></input>
        </div>

        </div>

        <div>
            <h2 style={{margin:'40px'}}>5 - Enter Churn Details</h2>
            <div style={{margin:10}}>
            <label style={{paddingRight:'40px'}} >Churn  : </label>
            <select   style={{margin:10,minWidth: '80px', height: '30px' }} value={churn} onChange={(e) => setChurn(e.target.value)}>
            <option>Select</option>
            <option value='1'>Existing customer</option>
        <option value='0'>Left</option>
         </select>
        </div>
        </div>

        <button type="submit"  onClick={handleSubmit} style={{margin:10,backgroundColor:'#282c34',height:'50px',width:'80px',color:'white'}}>Submit</button>
    </form>
    <ToastContainer />
    </div>
    </div>
);
}

export default DataEntry;