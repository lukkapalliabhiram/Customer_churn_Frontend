import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header';
import FilterSearch from './filter_search';
import Visualizations from './visualizations';
import homepageImage from "./home.png"
import Description from './description';
import DataEntry from './components/DataEntry';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);

  function Home() {
    return (
      <div className="dashboard">
        <img src={homepageImage} alt="Homepage" className="fullscreen-image"/>
        <Description />
      </div>
    );
  }
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
         <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/filter_search" element={<FilterSearch />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path = "/data" element = {<DataEntry/>}/>
          {/* <Route path="/help" component={Help} /> */}
        </Routes> 
      </div>
    </BrowserRouter>
  );
}

export default App;
