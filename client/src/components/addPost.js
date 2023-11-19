const addPost = (resetSwitch) => {
        if(resetSwitch === true){
            return resetSwitch = false;
        } else {
            return resetSwitch = true;
        }
    }

export default addPost;