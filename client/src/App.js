import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Customer } from './components/Customer.js';
import Customer_Data from './data/data.json';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

// function callApi() {
//     const response = fetch('/api/customers');
//     const body = response.json();
//     console.log(body);    
//     return body;
// }

function App() {
  
  const[customers, f1] = useState([]);

  useEffect(() => {
    fetch = ('/api/customers')
      .then((response) => response.json())
      .then(res => this.setState({customers : res.data}))
      .catch(err => console.log("err"));   
  },[]);

  return (
    <TableContainer component={Paper}>
      <Table sx = {{ minWidth: 1080 }} aria-label="Customer_Data_Table">
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Job</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { customers.map(c => <Customer key = { c.id } id = { c.id } image={ c.image } name = { c.name } birthday={ c.birthday } gender = { c.gender } job = { c.job }/>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
