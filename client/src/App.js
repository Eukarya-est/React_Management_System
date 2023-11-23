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
  const cellList = ["Number", "Profile Image", "Name", "Birthday", "Gender", "Job", "Registration Date", "Option"];

//Call Api
	const callApi = async () => {
		const response = await axios.get('/api/customers');
	setData(response.data);
	};

//ComponenetDidMount & ComponenetDidUpdate
	useEffect(() => {
		callApi();
	},[resetSwitch]);

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
      <SearchAppBar searchKeyword={searchKeyword} setKeyword={setKeyword}/>
      <div>
        <CustomerAdd resetSwitch={resetSwitch} setSwitch={setSwitch}/>
      </div>
      <TableContainer>
        <Table sx = {{ minWidth: 1080 }} area-label="Customer_Data_Table">
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell key = {c.toString()}>{c}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
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