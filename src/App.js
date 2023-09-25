import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Customer } from './components/Customer.js'
import Customer_Data from './data/data.json'


function App() { 
const[customers, f1] = useState(Customer_Data.data.customer);
  return (
    <div>
      { customers.map(c => <Customer key = { c.id } id = { c.id } image={ c.image } name = { c.name } birthday={ c.birthday } gender = { c.gender } job = { c.job }/>)}
    </div>
  );
}

export default App;
