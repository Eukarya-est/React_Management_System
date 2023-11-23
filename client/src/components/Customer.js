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
    const [deleteSwitch, setSwitch] = useState(false);   
    const createdDate = props.createdDate.replace('T', ' ').substring(0, 19);
    

    const handleDelete = (e) => {
        e.preventDefault();
        props.setSwitch(CustomerDelete(props.id, props.resetSwitch));
    };

    const handleDeleteOpen = () => {
        setSwitch(true);
    }

    const handleDeleteClose = () => {
        setSwitch(false);
    }

    return (
        <TableRow> 
            <TableCell>{ props.id }</TableCell> 
            <TableCell>< img src={ props.image } alt="profile"></img></TableCell>
            <TableCell>{ props.name }</TableCell>
            <TableCell>{ props.birthday }</TableCell>
            <TableCell>{ props.gender }</TableCell>
            <TableCell>{ props.job }</TableCell>
            <TableCell>{ createdDate }</TableCell>
            <TableCell><Button variant="contained" color="secondary" onClick={handleDeleteOpen}>Delete</Button></TableCell>
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
                    <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
                    <Button variant="outlined" color="secondary" onClick={handleDeleteClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </TableRow>

    );
  }