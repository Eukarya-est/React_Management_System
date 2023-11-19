import React, { useState } from 'react';
import axios from 'axios';
import useFileInput from './useFileInput.js';
import useDateInput from './useDateInput.js';
import useInput from './useInput.js';
import addPost from './addPost.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export function CustomerAdd(props) {

    //Dialog status;
    const [openSwitch, setSwitch] = useState(false);

    //Customer Data to be Added
    const file = useFileInput("","");
    const userName = useInput("");
    const birthday = useDateInput("");
    const gender = useInput("");
    const job = useInput("");
    
    //Form Submit
    const handleSubmit = (e) => {
        e.preventDefault()
        addCustomer()
            .then((response) => { 
                props.setSwitch(addPost(props.resetSwitch));
                setSwitch(false);
            })
    };
    
    const addCustomer = async () => {
    const url = '/api/customers'

    //modify birthday
    const formBirthday = birthday.value.$d.toISOString().slice(0,4) + birthday.value.$d.toISOString().slice(5,7) + birthday.value.$d.toISOString().slice(8,10);

    //Forming post-data
    const formData = new FormData();
    formData.append('image', file.value.file);
    formData.append('name', userName.value);
    formData.append('birthday', formBirthday);
    formData.append('gender', gender.value);
    formData.append('job', job.value);       
    
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, formData, config);
    };
    
    const handleDialogOpen = () => {
        setSwitch(true);
    }

    const handleDialogClose = () => {
        setSwitch(false);
    }
    
    
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                Add Customer
            </Button>
            <Dialog open={openSwitch} onClose={handleDialogClose} >
                <DialogTitle>Add Customer Form</DialogTitle>
                <DialogContent>
                    <input hidden type="file" id="raised-button-file" accept="image/*" file={""} value={""} onChange={file.onChange}/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {file.value.fileName === "" ? "Select Profile Image" : file.value.fileName}
                        </Button>
                    </label>
                    <br/>
                    <TextField variant="standard" label="Name" maxLength="64" value={userName.value} onChange={userName.onChange}/><br/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker label="Birthday" format="YYYY/MM/DD" value={birthday.value || null} onChange={birthday.onChange}/>
                        </DemoContainer>
                    </LocalizationProvider>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup row name="radio-buttons-group">
                                <FormControlLabel value="Male" control={<Radio/>} label="Male" onChange={gender.onChange}/>
                                <FormControlLabel value="Female" control={<Radio/>} label="Female" onChange={gender.onChange}/>    
                            </RadioGroup>
                    </FormControl><br/>
                    <TextField variant="standard" label="Job" maxLength="64" value={job.value} onChange={job.onChange}/><br/>                    
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Add</Button>
                    <Button variant="outlined" color="primary" onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
  }