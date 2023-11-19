import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CustomerDelete from './customerDelete.js';

export function Customer(props) {
    const createdDate = props.createdDate.replace('T', ' ').substring(0, 19);
    const handleDelete = (e) => {
        e.preventDefault();
        props.setSwitch(CustomerDelete(props.id, props.resetSwitch));
    };
    return (
        <TableRow> 
            <TableCell>{ props.id }</TableCell> 
            <TableCell>< img src={ props.image } alt="profile"></img></TableCell>
            <TableCell>{ props.name }</TableCell>
            <TableCell>{ props.birthday }</TableCell>
            <TableCell>{ props.gender }</TableCell>
            <TableCell>{ props.job }</TableCell>
            <TableCell>{ createdDate }</TableCell>
            <TableCell><button onClick={ handleDelete }>Delete</button></TableCell>
        </TableRow>

    );
  }