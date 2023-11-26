import React, { useState }from 'react';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import addPost from './addPost.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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

    //Dialog Status;
    const [openSwitch, setSwitch] = useState(false);
    //UseForm & DefaultValues
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        defaultValues:{
            profileImg:"",
            name:"",
            birthday:"",
            gender:"",
            job:""
        }
    });
    //Filename state;
    const [filename, setfilename] = useState("");
    //Image Maxsize
    let maxSize = 2 * 1024 * 1024; // 2MB
    
    //Form Submit
    const onSubmit = (data) => {
            addCustomer(data);
            resetData(data);
            setSwitch(false);
            props.setSwitch(addPost(props.resetSwitch));
    };
    //Check And Transfer Customer Data to be Added
    const addCustomer = async (data) => {
    const url = '/api/customers'  
    
    if( data.profileImg[0].size > maxSize ){
        alert("Image capacity must be less than 2 MB.");
        return;
    }

    //Modify Birthday
    const formBirthday = data.birthday.$d.toISOString().slice(0,4) + data.birthday.$d.toISOString().slice(5,7) + data.birthday.$d.toISOString().slice(8,10);

    //Forming Data to be Transfered
    const formData = new FormData();
    formData.append('image', data.profileImg[0]);
    formData.append('name', data.name);
    formData.append('birthday', formBirthday);
    formData.append('gender', data.gender);
    formData.append('job', data.job);
    
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, formData, config);
    };

    //Clear Input Data
    const resetData = async (data) => {
        reset({
            profileImg:"",
            name:"",
            birthday:"",
            gender:"",
            job:""
        });
        setfilename("")
    };
    
    //Add Customer Dialog Open
    const handleDialogOpen = () => {
        setSwitch(true);
    };

    //Add Customer Dialog Close
    const handleDialogClose = (data) => {
        resetData(data)
        setSwitch(false);
    };
    
    return (
        <div>
            {/* Add Customer Button */} 
            <Box sx={{ m: 2 }} textAlign='center'>
                <Button variant="outlined" sx={{
                    background: "#ffffff",
                    borderColor: "#2222ff", 
                    color: "#2222ff", 
                    ":hover" : { background: "#000095", borderColor: "#ffffff", color:"#ffffff"},}}  onClick={handleDialogOpen}>
                    Add Customer
                </Button>
            </Box>
            {/* Add Customer Form Dialog */}
                <Dialog open={openSwitch} onClose={handleDialogClose} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Add Customer Form Title */}
                    <DialogTitle>Add Customer Form</DialogTitle>
                    <DialogContent>
                    {/* ProfileImage */}
                    <p>Image file-size limit : 2MB</p>
                    <input hidden type="file" id="raised-button-file" accept="image/*" 
                        {...register("profileImg",{
                        required : 'This is required.',
                        onChange: (e) => setfilename(e.target.value)
                        })}/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" 
                                sx={{
                                    background: "#2222ff", 
                                    color: "white", 
                                    ":hover" : { background: "#000095"},}}
                                component="span" 
                                name="file">
                            {filename === ""? "Select Profile Image" : filename}
                        </Button>
                    </label>
                    <p style={{backgroundColor: '#ffbbbb', color : '#ff0000'}}>{errors.profileImg?.message}</p>
                    {/* Name */}                     
                    <TextField variant="standard" label="NAME" 
                        {...register("name", { 
                            required : 'This is required.', 
                            minLength : {
                                value : 1, 
                                message: "Please Input Name."
                            },
                            maxLength : {
                                value : 64, 
                                message : "Maximum length(64) exceeded."
                            },
                            pattern: {
                                value: /^[A-Za-z]/i,
                                message : "Please Input Alphabets Only."
                            },
                        })} type = "text"/>
                    <p style={{backgroundColor: '#ffbbbb', color : '#ff0000'}}>{errors.name?.message}</p>
                    <br/>
                    {/* Birthday */} 
                    <Controller
                        name="birthday"
                        control={control}
                        rules={{ required : 'This is required.' }}
                        render={({ field: { onChange, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker label="BIRTHDAY" format="YYYY/MM/DD" onChange={onChange} selected={value}/>
                        </DemoContainer>
                    </LocalizationProvider>
                    )}/>                    
                    <p style={{backgroundColor: '#ffbbbb', color : '#ff0000'}}>{errors.birthday?.message}</p>
                    <br/>
                    {/* Gender */} 
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required : 'This is required.' }}
                        render={({ field: { onChange, value } }) => (
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">GENDER</FormLabel>
                                <RadioGroup 
                                row name="radio-buttons-group" 
                                selected={value} onChange={onChange}>
                                    <FormControlLabel value="Male" control={<Radio/>} label="MALE"/>
                                    <FormControlLabel value="Female" control={<Radio/>} label="FEMALE"/>    
                                </RadioGroup>
                                <p style={{backgroundColor: '#ffbbbb', color : '#ff0000'}}>{errors.gender?.message}</p>
                        </FormControl> 
                    )}/>
                    <br/>
                    {/* Job */} 
                    <TextField variant="standard" label="JOB" 
                        {...register("job", { 
                            required : 'This is required.', 
                            minLength : {
                                value : 1, 
                                message: "Please Input Job."
                            },
                            maxLength : {
                                value : 64, 
                                message : "Maximum length(64) exceeded."
                            },
                            pattern: {
                                value: /^[A-Za-z]/i,
                                message : "Please Input Alphabets Only."
                            },
                        })} type = "text"/>
                    <p style={{backgroundColor: '#ffbbbb', color : '#ff0000'}}>{errors.job?.message}</p>                                 
                </DialogContent>
                <DialogActions>
                    {/* Add Button */}
                    <Button variant="contained" sx={{
                            background: "#2222ff", 
                            color: "white", 
                            ":hover" : { background: "#000095"},}} type='submit'>Add</Button>
                    {/* Close Button */}
                    <Button variant="outlined" sx={{
                        background: "#ffffff",
                        borderColor: "#2222ff", 
                        color: "#2222ff", 
                        ":hover" : { background: "#000095", borderColor: "#ffffff", color:"#ffffff"},}} 
                        onClick={handleDialogClose}>
                            Close</Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    );
  }