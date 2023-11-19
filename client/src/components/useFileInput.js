import { useState } from 'react';

const useFileInput = (initialFile, initialFileName) => {
    const [value, setValue] = useState({
        file: initialFile,
        fileName: initialFileName,       
    });

    const handleChange = (e) => {
        setValue((prevState) => ({
            ...prevState,
            file: e.target.files[0],
            fileName: e.target.value
        }));         
    };

    return{
        value,
        onChange: handleChange
    };
};

export default useFileInput;

