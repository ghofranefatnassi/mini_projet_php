import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    useEffect(()=>{
        if (!localStorage.getItem('user-info')) {
            navigate("/");
        }
    },[]);
    const navigate = useNavigate();
    let Cmp = props.Cmp;
  return (
    <div>
      <Cmp/>
    </div>
  )
}

export default Protected
