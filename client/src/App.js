import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { Customer } from './components/customer.js';
import { CustomerAdd } from './components/customerAdd.js';
import { SearchAppBar } from './components/appBar.js';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { CircularProgress } from '@mui/material';

function App() {
//Customer Data
  const[customers_data, setData] = useState("");
//add-delete post-processing switch
  const[resetSwitch, setSwitch] = useState(true);
  const[searchKeyword, setKeyword] = useState("");
  const cellList = ["#", "PROFILE IMG", "NAME", "BIRTHDAY", "GENDER", "JOB", "REGISTRATION DATE", "OPTION"];

//Call Api
	const callApi = async () => {
		const response = await axios.get('/api/customers');
	setData(response.data);
	};

//ComponenetDidMount & ComponenetDidUpdate : Depend on resetSwitch
	useEffect(() => {
		callApi();
	},[resetSwitch]);

//Filtered(According to the Search Keyword) Components Output Control
const FilteredComponents = (data) => {
  data = data.filter((c) =>{
  return c.name.toLowerCase().indexOf(searchKeyword) > -1 ;
});
  return data.map((c) => {
    return <Customer key = { c.id } id = { c.id } image={ c.image } name = { c.name } birthday={ c.birthday } gender = { c.gender } job = { c.job } createdDate = {c.createdDate}
      resetSwitch={resetSwitch} setSwitch={setSwitch}/>
});
};

//Display
  return (
    <div>
      {/* SearchAppbar */}  
      <SearchAppBar searchKeyword={searchKeyword} setKeyword={setKeyword}/>
      {/* AddCustomer Button */}  
      <CustomerAdd resetSwitch={resetSwitch} setSwitch={setSwitch}/>
      {/* Customer Data Table */}  
      <TableContainer sx={{overflow:'hidden', minWidth: 1080, width: '98%', ml: 2, mr: 2}}>
        <Table area-label="Customer_Data_Table">
          {/* Customer Data Categori Name */}
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell sx={{ fontWeight:'bold', fontSize:'16px'}} key = {c.toString()}>{c}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
          {/* Customer Data Contents : components/customer.js */}  
            { customers_data ? FilteredComponents(customers_data) :
              <TableRow>
                <TableCell colSpan="8" align="center">
                  <CircularProgress color="inherit"/>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;