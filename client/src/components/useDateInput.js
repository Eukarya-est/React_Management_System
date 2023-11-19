import { useState } from 'react';

const useDateInput = (Date) => {
    const [value, setValue] = useState(Date);

    const handleChange = (Date) => {
        setValue(Date);         
    };

    return{
        value,
        onChange: handleChange
    };
};

export default useDateInput;

