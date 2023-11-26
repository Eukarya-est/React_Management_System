import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CustomerDelete from './customerDelete.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'

export function Customer(props) {
    //
    const [deleteSwitch, setSwitch] = useState(false);   
    
    //Forming Registration Date
    const createdDate = props.createdDate.replace('T', ' ').substring(0, 19);
    
    //Delete
    const handleDelete = (e) => {
        e.preventDefault();
        props.setSwitch(CustomerDelete(props.id, props.resetSwitch));
    };

    //Delete Check Dialog Open
    const handleDeleteOpen = () => {
        setSwitch(true);
    }

    //Delete Check Dialog Close
    const handleDeleteClose = () => {
        setSwitch(false);
    }

    return (
        <TableRow> 
            {/* Customer Data Table */} 
            <TableCell>{ props.id }</TableCell> 
            <TableCell>< img src={ props.image } alt="profile" style={{height:64, width:64}}></img></TableCell>
            <TableCell>{ props.name }</TableCell>
            <TableCell>{ props.birthday }</TableCell>
            <TableCell>{ props.gender }</TableCell>
            <TableCell>{ props.job }</TableCell>
            <TableCell>{ createdDate }</TableCell>
            <TableCell><Button variant="contained" sx={{
                    background: "#ff2222", 
                    color: "white", 
                    ":hover" : { background: "#950000"},}} onClick={handleDeleteOpen}>Delete</Button></TableCell>
            {/* Delete Check Dialog */}        
            <Dialog open={deleteSwitch} onClose={handleDeleteClose}>
                <DialogTitle onClose={handleDeleteClose}>
                    Warning 
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        Customer information will be deleted.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    {/* Delete Button */} 
                    <Button variant="contained"  sx={{
                    background: "#dd3333", 
                    color: "white", 
                    ":hover" : { background: "#950000"},}} onClick={handleDelete}>Delete</Button>
                    {/* Close Button */} 
                    <Button variant="outlined"  sx={{
                    background: "#ffffff",
                    borderColor: "#dd3333", 
                    color: "#dd3333", 
                    ":hover" : { background: "#950000", borderColor: "#ffffff", color: "#ffffff",},}} onClick={handleDeleteClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </TableRow>

    );
  }