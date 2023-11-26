// Post-processing reset-switching
const addPost = async (resetSwitch) => {
        if(resetSwitch === true){
            return resetSwitch = false;
        } else {
            return resetSwitch = true;
        }
    }

export default addPost;