import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { Customer } from './components/customer.js';
import { CustomerAdd } from './components/customerAdd.js';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';

function App() {
  //Customer Data
  const[customers_data, setData] = useState("");
  //add-delete post-processing count
  const[resetSwitch, setSwitch] = useState(true);

  //Call Api
  const callApi = async () => {
    const response = await axios.get('/api/customers');
    setData(response.data);
    console.log("callApi");
  };

  //ComponenetDidMount & ComponenetDidUpdate
    useEffect(() => {
      callApi();
    },[]);

    useEffect(() => {
      callApi();
    },[resetSwitch]);

  //Display
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx = {{ minWidth: 1080 }} area-label="Customer_Data_Table">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { customers_data ? customers_data.map(c => {
                return(<Customer key = { c.id } id = { c.id } image={ c.image } name = { c.name } birthday={ c.birthday } gender = { c.gender } job = { c.job } createdDate = {c.createdDate}
                resetSwitch={resetSwitch} setSwitch={setSwitch}/>)
              }) :
              <TableRow>
                <TableCell colSpan="8" align="center">
                  <CircularProgress color="inherit"/>
                </TableCell>
              </TableRow>
              }
          </TableBody>
        </Table>
      </TableContainer>
      <CustomerAdd resetSwitch={resetSwitch} setSwitch={setSwitch}/>
    </div>
  );
}

export default App;