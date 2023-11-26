import addPost from './addPost.js';
//Delete Flag:On Request
const CustomerDelete = (id, resetSwitch) => {
        const url = '/api/customers/' + id;
        let switchstatus = resetSwitch;
        fetch(url,{
            method: 'DELETE'
        });
        switchstatus = addPost(resetSwitch);
        return switchstatus;
}

export default CustomerDelete;