const Validation =(values)=> {

    let errors ={};
    if (!values.email){
        errors.email="E-mail est obligatoire."
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="E-mail est invalid."
    }

    if (!values.password){
        errors.password="Mot de passe est obligatoire."
    }else if(values.password.length<8){
        errors.password="Le mot de passe est trop court. Il doit contenir au moins 8 caractères."
    }
    if (!values.Npwd){
        errors.Npwd="Password is required."
    }else if(values.Npwd.length<8){
            errors.Npwd="Password too short it must be at least 8 caracterse ."
            }
    if (values.cpassword!==values.password){
                errors.cpassword='incorrect try again.'
           }
    
   // else if (!/\[a-z]/){
   //     errors.password="Password must have at least one letter."
   // }else if (!/\[A-Z]/){
    //    errors.password="Password  must contain at least one capital letter "
    //}else if(!/\[0-9]/){
    //    errors.password="Password must contian at least a number "}
    
    if (!values.cpassword){
        errors.cpassword="Confirmatio of password is required."
    }//else if (!values.cpassword===!values.password){
     //errors.cpassword="Confermation password and password need to be the same ."
    //}
    if (!values.Cnpwd){
        errors.Cnpwd="Confirmatio of password is required."
    }
    return errors;


};

export default Validation;
