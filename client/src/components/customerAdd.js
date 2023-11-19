import React from 'react';
import axios from 'axios';
import useFileInput from './useFileInput.js';
import useInput from './useInput.js';
import addPost from './addPost.js';

export function CustomerAdd(props) {

    //Customer Data to be Added
    const file = useFileInput("","");
    const userName = useInput("");
    const birthday = useInput("");
    const gender = useInput("");
    const job = useInput("");
    
    //Form Submit
    const handleSubmit = (e) => {
        e.preventDefault()
        addCustomer()
            .then((response) => { 
                props.setSwitch(addPost(props.resetSwitch));
            })

    };
       
    //Form Clear
    const handleClear = (e) => {
        e.preventDefault()
        userName.value = "";
        birthday.value = "";
        gender.value = "";
        job.value = "";
    };
    
    const addCustomer = async () => {
    const url = '/api/customers'

    //modify birthday
    const formBirthday = birthday.value.slice(0,4) + birthday.value.slice(5,7) + birthday.value.slice(8,10);

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
    
    return (
        <form>
            <h1>Customer Add</h1>
            Profile Image: <input type="file" id="file" accept="image/*" file={file.value.file} value={file.value.fileName} onChange={file.onChange}/><br/>
            Name : <input placeholder="Name" maxLength="64" value={userName.value} onChange={userName.onChange}/><br/>
            Birthday : <input type="date" value={birthday.value} onChange={birthday.onChange}/><br/>
            Gender : <input type="radio" id="male" name="gender" value={"Male"} onChange={gender.onChange}/>
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value={"Female"} onChange={gender.onChange}/>
                <label htmlFor="female">Female</label><br/>
            Job : <input placeholder="Job" maxLength="64" value={job.value} onChange={job.onChange}/><br/>
            <button type="submit" onClick={handleSubmit}>Add</button>
            <button type="clear" onClick={handleClear}>Clear</button>
        </form>
    );
  }