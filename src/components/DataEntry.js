import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import image from '../images/download.jpeg';
import image1 from '../images/b6.png';
import api from '../api copy';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import './DataEntrypage.css';


const DataEntry = () => {

    const [fgender, setGender] = useState('');
    const [fsc, setSc] = useState('');
    const [fpartner, setPartner] = useState('');
    const [fdep, setFdep] = useState('');
    const [contract, setContract] = useState('');
    const [tenure, setTenure] = useState('');
    const [phone, setPhone] = useState('');
    const [ml, setml] = useState('');
    const [internet, setInternet] = useState('');
    const [osl, setosl] = useState('');
    const [obackup, setobackup] = useState('');
    const [devprotect, setdevprotect] = useState('');
    const [techsupport, setTechSupport] = useState('');
    const [tv, setTV] = useState('');
    const [movies, setMovies] = useState('');
    const [ppb, setPPB] = useState('');
    const [payMethod, setPayMethod] = useState('');
    const [monthlyCharge, setMonthlyCharge] = useState('');
    const [totalCharges, settotal] = useState('');
    const [churn, setChurn] = useState('');
    const [action, setAction] = useState('');
    const [customerID, setCustomerID] = useState('');
    const [showForm, setShowForm] = useState(false);






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

    const Churn = {
        'Existing Customer': 0,
        'Left': 1

    }

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



    const getCustomerData = async (customerID) => {
        /*
        axios.get('http://localhost:4500/api/customers/:customerId', { params: {customerId:customerID } })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        throw new Error('Failed to fetch customer data');
      });*/

        await api.post(`https://customer-churn-ctln.onrender.com/api/customers/get`, { customerId: customerID })
            .then((response) => {
                const customerData = response;
                console.log(customerData);
                toast.success('Customer details fetched successfully for: ' + customerID);
                if (customerData) {
                    // Set the state values with the fetched customer data
                    setGender(customerData.gender);
                    setSc(customerData.seniorcitizen);
                    setPartner(customerData.partner);
                    setFdep(customerData.dependents);
                    setContract(customerData.contract);
                    setTenure(customerData.tenure);
                    setPhone(customerData.phoneservice);
                    setml(customerData.multiplelines);
                    setInternet(customerData.internetservice);
                    setosl(customerData.onlinesecurity);
                    setobackup(customerData.onlinebackup);
                    setdevprotect(customerData.deviceprotection);
                    setTechSupport(customerData.techsupport);
                    setTV(customerData.tv);
                    setMovies(customerData.movies);
                    setPPB(customerData.paperlessbilling);
                    setPayMethod(customerData.paymentmethod);
                    setMonthlyCharge(customerData.monthlycharges);
                    settotal(customerData.totalcharges);
                    setChurn(customerData.churn);

                    // Show the form fields
                    setShowForm(true);
                }
                //clearForm();
            })
            .catch((error) => {
                console.log(error);
            });

        /*try {
            const response = await fetch(`http://localhost:4500/api/customers/${customerID}`);
            

            if (!response.ok) {
                throw new Error('Failed to fetch customer data');
            }

            const customerData = await response.json();

            return customerData;
           
        } catch (error) {
            console.error('Error fetching customer data:', error);
            return null;
        }*/
    };



    const handleCustomerIdSubmit = async (e) => {
        e.preventDefault();

        try {
            const customerData = getCustomerData(customerID);
            //console.log('hcs');
        } catch (error) {
            console.error('Something went wrong:', error);
            clearForm();
        }
    };




    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        if (!fgender) {
            toast.error('Please select gender');
            return;
        }
        if (!fsc) {
            toast.error('Please select whether you are a senior citizen');
            return;
        }
        if (!fpartner) {
            toast.error('Please select partner details');
            return;
        }
        if (!fdep) {
            toast.error('Please select dependent details');
            return;
        }
        if (!contract) {
            toast.error('Please select contract details');
            return;
        }
        if (!phone) {
            toast.error('Please select gender');
            return;
        }
        if (!ml) {
            toast.error('Please select phone details');
            return;
        }
        if (!internet) {
            toast.error('Please select gender');
            return;
        }
        if (!tenure) {
            toast.error('Please enter tenure');
            return;
        }
        if (!osl) {
            toast.error('Please select online security service details');
            return;
        }
        if (!obackup) {
            toast.error('Please select online backup details');
            return;
        }

        if (!devprotect) {
            toast.error('Please select device protection details');
            return;
        }
        if (!techsupport) {
            toast.error('Please select tech support details');
            return;
        }
        if (!tv) {
            toast.error('Please select TV service details');
            return;
        }
        if (!movies) {
            toast.error('Please select movie details');
            return;
        }
        if (!ppb) {
            toast.error('Please select paperless billing details');
            return;
        }
        if (!payMethod) {
            toast.error('Please select payment method details');
            return;
        }
        if (!monthlyCharge) {
            toast.error('Please enter monthly charges');
            return;
        }
        if (!totalCharges) {
            toast.error('Please enter total charges');
            return;
        }
        if (!churn) {
            toast.error('Please select churn details');
            return;
        }

        const data = {
            'gender': parseInt(fgender),
            'sc': parseInt(fsc),
            'partner': parseInt(fpartner),
            'dependents': parseInt(fdep),
            'contract': parseInt(contract),
            'phone': parseInt(phone),
            'ml': parseInt(ml),
            'internet': parseInt(internet),
            'Tenure': parseInt(tenure),
            'osl': parseInt(osl),
            'backup': parseInt(obackup),
            'devpro': parseInt(devprotect),
            'techSupport': parseInt(techsupport),
            'tv': parseInt(tv),
            'movies': parseInt(movies),
            'ppb': parseInt(ppb),
            'payMethod': parseInt(payMethod),
            'monthlyCharges': parseFloat(monthlyCharge),
            'totalCharges': parseFloat(totalCharges),
            'churn': parseInt(churn)

        }
        console.log(data);

        api
            .post('https://customer-churn-ctln.onrender.com/api/create', data)
            .then((response) => {
                console.log(response);
                toast.success('Customer added successfull with customerId: ' + response.customerId);
                clearForm();
            })
            .catch((error) => {
                console.log(error);
            });

        clearForm();
        closePopup();
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log("in handle edit");
        const data = {
            gender: fgender,
            seniorCitizen: fsc,
            partner: fpartner,
            dependents: fdep,
            customerId: customerID,
            phoneService: phone,
            multipleLines: ml,
            internetService: internet,
            tenure: tenure,
            onlineSecurity: osl,
            onlineBackup: obackup,
            deviceProtection: devprotect,
            techSupport: techsupport,
            streamingTV: tv,
            streamingMovies: movies,
            contract: contract,
            paperlessBilling: ppb,
            paymentMethod: payMethod,
            monthlyCharges: monthlyCharge,
            totalCharges: totalCharges,
            churn: churn,
        }
        await api.post(`https://customer-churn-ctln.onrender.com/api/customer/update`, data)
            .then((response) => {
                console.log(response)
                toast.success("Customer details updated successfully");
            }
            )
            .catch((error) => {
                console.log(error);
            });

        clearForm();
        closePopup();
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        /*
            // Make an API call to delete the customer by customer ID
            try {
                const response = await fetch(`http://localhost:4500/api/customer/delete/${customerID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }
        
                // Perform additional actions after successfully deleting the customer, e.g., show a success message, clear the form, etc.
                console.log(`Customer with ID ${customerID} deleted successfully.`);
                
                clearForm();
            } catch (error) {
                console.error('Error deleting customer:', error);
            }*/
        await api.post(`https://customer-churn-ctln.onrender.com/api/customer/delete`, { customerId: customerID })
            .then((response) => {
                toast.success('Customer details deleted successfully for: ' + customerID);
            })
            .catch((error) => {
                console.log(error);
            });
        clearForm();
    };


    const openPopup = (action) => {
        setAction(action);
    };

    const closePopup = () => {
        setAction('');
    };

    function getKeyByValue(object, value) {
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (object[prop] === value)
                    return prop;
            }
        }
    }

    return (
        <div style={{ height: '1700px' }} className="container">
            <div style={{ width: '450px', height: '1000px', marginLeft: '30rem' }} className="form-wrapper">
                <div className="button-group">
                    <button className="action-button" onClick={() => openPopup("create")}>Create</button>
                    <button className="action-button" onClick={() => openPopup("edit")}>Edit</button>
                    <button className="action-button" onClick={() => openPopup("delete")}>Delete</button>
                </div>

                {action === 'create' && (
                    <div className="form">
                        <form onSubmit={handleCreateSubmit} >
                            <form style={{ backgroundImage: `url(${image})` }}>
                                <div>
                                    <h2 style={{ marginBottom: '40px' }}>1 - Enter new customer details</h2>
                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label" >Gender : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={fgender} onChange={(e) => setGender(e.target.value)} defaultValue={'Female'}>
                                            <option>Select Gender</option>
                                            <option value='1' >Male</option>
                                            <option value='0'>Female</option>

                                        </select>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Senior Citizen : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={fsc} onChange={(e) => setSc(e.target.value)}>
                                            <option>Select</option>
                                            <option value='1' >Yes</option>
                                            <option value='0'>No</option>
                                        </select>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }}  className="form-label">Partner: </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={fpartner} onChange={(e) => setPartner(e.target.value)}>
                                            <option>Select</option>
                                            <option value='1'>Yes</option>
                                            <option value='0'>No</option>
                                        </select>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Dependents : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={fdep} onChange={(e) => setFdep(e.target.value)}>
                                            <option>Select</option>
                                            <option value='1'>Yes</option>
                                            <option value='0'>No</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <h2 style={{ margin: '40px' }}>2 - Enter Plan details</h2>
                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Contract : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={contract} onChange={(e) => setContract(e.target.value)}>
                                            <option>Select</option>
                                            <option value='1'>Month-to-month</option>
                                            <option value='0'>One year</option>
                                            <option value='2'>Two year</option>
                                        </select>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label"> PhoneService : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={phone} onChange={(e) => setPhone(e.target.value)}>
                                            <option>Select</option>
                                            <option value='1'>Yes</option>
                                            <option value='0'>No</option>
                                        </select>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">MultipleLines  : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={ml} onChange={(e) => setml(e.target.value)}>
                                            <option>Select</option>
                                            <option value='2'>Yes</option>
                                            <option value='0'>No</option>
                                            <option value='1'>No phone service</option>
                                        </select>
                                    </div>


                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label"> IntenetService  : </label>
                                        <select style={{ margin: 10, minWidth: '100px', height: '30px' }} value={internet} onChange={(e) => setInternet(e.target.value)}>
                                            <option>Select</option>
                                            <option value='1'>Fiber optic</option>
                                            <option value='0'>DSL</option>
                                            <option value='2'>No</option>
                                        </select>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Tenure :</label>
                                        <input type="text" value={tenure} onChange={(e) => setTenure(e.target.value)}></input>
                                    </div>

                                </div>

                                <div>
                                    <h2 style={{ margin: '40px' }}>3 - Enter Subscription details</h2>


                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Online Security Services  : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={osl} onChange={(e) => setosl(e.target.value)}>
                                            <option>Select</option>
                                            <option value='2'>Yes</option>
                                            <option value='0'>No</option>
                                            <option value='1'>No internet service</option>
                                        </select>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Online Backup  : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={obackup} onChange={(e) => setobackup(e.target.value)}>
                                            <option>Select</option>
                                            <option value='2'>Yes</option>
                                            <option value='0'>No</option>
                                            <option value='1'>No internet service</option>
                                        </select>
                                    </div>


                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Device Protection  : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={devprotect} onChange={(e) => setdevprotect(e.target.value)}>
                                            <option>Select</option>
                                            <option value='2'>Yes</option>
                                            <option value='0'>No</option>
                                            <option value='1'>No internet service</option>
                                        </select>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Tech Support  : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={techsupport} onChange={(e) => setTechSupport(e.target.value)}>
                                            <option>Select</option>
                                            <option value='2'>Yes</option>
                                            <option value='0'>No</option>
                                            <option value='1'>No internet service</option>
                                        </select>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Streaming TV Services  : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={tv} onChange={(e) => setTV(e.target.value)}>
                                            <option>Select</option>
                                            <option value='2'>Yes</option>
                                            <option value='0'>No</option>
                                            <option value='1'>No internet service</option>
                                        </select>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Streaming Movie Services  : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={movies} onChange={(e) => setMovies(e.target.value)}>
                                            <option>Select</option>
                                            <option value='2'>Yes</option>
                                            <option value='0'>No</option>
                                            <option value='1'>No internet service</option>
                                        </select>
                                    </div>

                                </div>


                                <div>
                                    <h2 style={{ margin: '40px' }}>4 - Enter Payment Details</h2>
                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">PaperlessBilling  : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={ppb} onChange={(e) => setPPB(e.target.value)}>
                                            <option>Select</option>
                                            <option value='1'>Yes</option>
                                            <option value='0'>No</option>
                                        </select>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">PaymentMethod  : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
                                            <option>Select</option>
                                            <option value='1'>Credit card (automatic)</option>
                                            <option value='0'>Bank transfer (automatic)</option>
                                            <option value='2'>Electronic check</option>
                                            <option value='3'>Mailed check</option>
                                        </select>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Monthly Charges  : </label>
                                        <input type="text" value={monthlyCharge} onChange={(e) => setMonthlyCharge(e.target.value)}></input>
                                    </div>

                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Total Charges  : </label>
                                        <input type="text" value={totalCharges} onChange={(e) => settotal(e.target.value)}></input>
                                    </div>

                                </div>

                                <div>
                                    <h2 style={{ margin: '40px' }}>5 - Enter Churn Details</h2>
                                    <div style={{ margin: 10 }}>
                                        <label style={{ paddingRight: '40px' }} className="form-label">Churn  : </label>
                                        <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={churn} onChange={(e) => setChurn(e.target.value)}>
                                            <option>Select</option>
                                            <option value='1'>Existing customer</option>
                                            <option value='0'>Left</option>
                                        </select>
                                    </div>
                                </div>
                            </form>                        <div>
                                <button onClick={handleEditSubmit} className="form-submit">Update</button>
                                <button onClick={clearForm} className="form-submit">Clear</button>
                            </div>
                        </form>
                        <ToastContainer />
                    </div>


                )}

                {action === 'edit' && (
                    <form onSubmit={handleCustomerIdSubmit}>
                        <label className="form-label">Customer ID:</label>
                        <input className="form-input" type="text" value={customerID} onChange={(e) => setCustomerID(e.target.value)} />
                        <button className="form-submit" type="submit">Submit</button>

                        {showForm && (
                            <>
                                {/* Display the form fields with the customer data for editing */}
                                <form style={{ backgroundImage: `url(${image})` }}>
                                    <div>
                                        <h2 style={{ marginBottom: '40px' }}>1 - Enter new customer details</h2>
                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Gender : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={fgender} onChange={(e) => setGender(e.target.value)} defaultValue={'Female'}>
                                                <option>Select Gender</option>
                                                <option value='1' >Male</option>
                                                <option value='0'>Female</option>

                                            </select>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Senior Citizen : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={fsc} onChange={(e) => setSc(e.target.value)}>
                                                <option>Select</option>
                                                <option value='1' >Yes</option>
                                                <option value='0'>No</option>
                                            </select>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }}  className="form-label">Partner: </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={fpartner} onChange={(e) => setPartner(e.target.value)}>
                                                <option>Select</option>
                                                <option value='1'>Yes</option>
                                                <option value='0'>No</option>
                                            </select>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Dependents : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={fdep} onChange={(e) => setFdep(e.target.value)}>
                                                <option>Select</option>
                                                <option value='1'>Yes</option>
                                                <option value='0'>No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 style={{ margin: '40px' }}>2 - Enter Plan details</h2>
                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Contract : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={contract} onChange={(e) => setContract(e.target.value)}>
                                                <option>Select</option>
                                                <option value='1'>Month-to-month</option>
                                                <option value='0'>One year</option>
                                                <option value='2'>Two year</option>
                                            </select>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label"> PhoneService : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={phone} onChange={(e) => setPhone(e.target.value)}>
                                                <option>Select</option>
                                                <option value='1'>Yes</option>
                                                <option value='0'>No</option>
                                            </select>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">MultipleLines  : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={ml} onChange={(e) => setml(e.target.value)}>
                                                <option>Select</option>
                                                <option value='2'>Yes</option>
                                                <option value='0'>No</option>
                                                <option value='1'>No phone service</option>
                                            </select>
                                        </div>


                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label"> IntenetService  : </label>
                                            <select style={{ margin: 10, minWidth: '100px', height: '30px' }} value={internet} onChange={(e) => setInternet(e.target.value)}>
                                                <option>Select</option>
                                                <option value='1'>Fiber optic</option>
                                                <option value='0'>DSL</option>
                                                <option value='2'>No</option>
                                            </select>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Tenure :</label>
                                            <input type="text" value={tenure} onChange={(e) => setTenure(e.target.value)}></input>
                                        </div>

                                    </div>

                                    <div>
                                        <h2 style={{ margin: '40px' }}>3 - Enter Subscription details</h2>


                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Online Security Services  : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={osl} onChange={(e) => setosl(e.target.value)}>
                                                <option>Select</option>
                                                <option value='2'>Yes</option>
                                                <option value='0'>No</option>
                                                <option value='1'>No internet service</option>
                                            </select>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Online Backup  : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={obackup} onChange={(e) => setobackup(e.target.value)}>
                                                <option>Select</option>
                                                <option value='2'>Yes</option>
                                                <option value='0'>No</option>
                                                <option value='1'>No internet service</option>
                                            </select>
                                        </div>


                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Device Protection  : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={devprotect} onChange={(e) => setdevprotect(e.target.value)}>
                                                <option>Select</option>
                                                <option value='2'>Yes</option>
                                                <option value='0'>No</option>
                                                <option value='1'>No internet service</option>
                                            </select>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Tech Support  : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={techsupport} onChange={(e) => setTechSupport(e.target.value)}>
                                                <option>Select</option>
                                                <option value='2'>Yes</option>
                                                <option value='0'>No</option>
                                                <option value='1'>No internet service</option>
                                            </select>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Streaming TV Services  : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={tv} onChange={(e) => setTV(e.target.value)}>
                                                <option>Select</option>
                                                <option value='2'>Yes</option>
                                                <option value='0'>No</option>
                                                <option value='1'>No internet service</option>
                                            </select>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Streaming Movie Services  : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={movies} onChange={(e) => setMovies(e.target.value)}>
                                                <option>Select</option>
                                                <option value='2'>Yes</option>
                                                <option value='0'>No</option>
                                                <option value='1'>No internet service</option>
                                            </select>
                                        </div>

                                    </div>


                                    <div>
                                        <h2 style={{ margin: '40px' }}>4 - Enter Payment Details</h2>
                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">PaperlessBilling  : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={ppb} onChange={(e) => setPPB(e.target.value)}>
                                                <option>Select</option>
                                                <option value='1'>Yes</option>
                                                <option value='0'>No</option>
                                            </select>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">PaymentMethod  : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
                                                <option>Select</option>
                                                <option value='1'>Credit card (automatic)</option>
                                                <option value='0'>Bank transfer (automatic)</option>
                                                <option value='2'>Electronic check</option>
                                                <option value='3'>Mailed check</option>
                                            </select>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Monthly Charges  : </label>
                                            <input type="text" value={monthlyCharge} onChange={(e) => setMonthlyCharge(e.target.value)}></input>
                                        </div>

                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Total Charges  : </label>
                                            <input type="text" value={totalCharges} onChange={(e) => settotal(e.target.value)}></input>
                                        </div>

                                    </div>

                                    <div>
                                        <h2 style={{ margin: '40px' }}>5 - Enter Churn Details</h2>
                                        <div style={{ margin: 10 }}>
                                            <label style={{ paddingRight: '40px' }} className="form-label">Churn  : </label>
                                            <select style={{ margin: 10, minWidth: '80px', height: '30px' }} value={churn} onChange={(e) => setChurn(e.target.value)}>
                                                <option>Select</option>
                                                <option value='1'>Existing customer</option>
                                                <option value='0'>Left</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button onClick={handleEditSubmit} className="form-submit">Update</button>
                                    <button onClick={clearForm} className="form-submit">Clear</button>
                                </form>
                                <div>

                                </div>
                            </>
                        )}
                    </form>
                )}


                {action === 'delete' && (
                    <form onSubmit={handleCustomerIdSubmit}>
                        <label className="form-label">Customer ID:</label>
                        <input className="form-input" type="text" value={customerID} onChange={(e) => setCustomerID(e.target.value)} />
                        <button className="form-submit" type="submit">Submit</button>

                        {showForm && (
                            <>
                                {/* Display the customer data for confirmation */}
                                <form >
                                    <div>
                                        {/* Display fetched customer data */}
                                        <div>
                                            <p><strong>Customer ID: </strong> {customerID}</p>
                                            <p><strong>Gender:</strong> {getKeyByValue(gender, fgender)}</p>
                                            <p><strong>Senior Citizen:</strong> {getKeyByValue(sc, fsc)}</p>
                                            <p><strong>Partner:</strong> {getKeyByValue(partner, fpartner)}</p>
                                            <p><strong>Dependents:</strong> {getKeyByValue(dependents, fdep)}</p>
                                            <p><strong>Phone Service:</strong> {getKeyByValue(PhoneService, phone)}</p>
                                            <p><strong>Multiple Lines:</strong> {getKeyByValue(MultipleLines, ml)}</p>
                                            <p><strong>Internet Service:</strong> {getKeyByValue(InternetService, internet)}</p>
                                            <p><strong>Online Security:</strong> {getKeyByValue(onlineSecurity, osl)}</p>
                                            <p><strong>Online Backup:</strong> {getKeyByValue(OnlineBackup, obackup)}</p>
                                            <p><strong>Device Protection:</strong> {getKeyByValue(DeviceProtection, devprotect)}</p>
                                            <p><strong>Tech Support:</strong> {getKeyByValue(TechSupport, techsupport)}</p>
                                            <p><strong>Streaming TV:</strong> {getKeyByValue(StreamingTV, tv)}</p>
                                            <p><strong>Streaming Movies:</strong> {getKeyByValue(StreamingMovies, movies)}</p>
                                            <p><strong>Contract:</strong> {getKeyByValue(Contract, contract)}</p>
                                            <p><strong>Paperless Billing:</strong> {getKeyByValue(PaperlessBilling, ppb)}</p>
                                            <p><strong>Payment Method:</strong> {getKeyByValue(PaymentMethod, payMethod)}</p>
                                            <p><strong>Monthly Charges:</strong> {monthlyCharge}</p>
                                            <p><strong>Total Charges:</strong> {totalCharges}</p>
                                            <p><strong>Churn:</strong> {getKeyByValue(Churn, churn)}</p>
                                        </div>

                                    </div>
                                    <div>
                                        <button onClick={handleEditSubmit} className="form-submit">Update</button>
                                        <button onClick={clearForm} className="form-submit">Clear</button>
                                    </div>
                                </form>
                            </>
                        )}
                    </form>
                )}
                <ToastContainer />
            </div>
        </div>
    );
};

export default DataEntry;
