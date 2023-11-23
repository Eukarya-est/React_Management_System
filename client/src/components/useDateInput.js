import { useState } from 'react';

const useDateInput = (date) => {
    const [value, setValue] = useState(date);

    const handleChange = (date) => {
        setValue(date);         
    };

    return{
        value,
        onChange: handleChange
    };
};

export default useDateInput;

