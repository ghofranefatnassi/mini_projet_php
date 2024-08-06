import React, { useState, useEffect } from 'react';
import Header from './Header';

const Service = () => {
  const user = JSON.parse(localStorage.getItem('user-info'));
  const userId = user && user.Id;

  const [name_cli, setName_cli] = useState('');
  const [phone_cli, setPhone_cli] = useState('');
  const [adress_cli, setAdress_cli] = useState('');
  const [zone_cli, setZone_cli] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [technician, setTechnician] = useState('');

  async function add() {
    const formData = new FormData();
    formData.append('name_cli', name_cli);
    formData.append('phone_cli', phone_cli);
    formData.append('adress_cli', adress_cli);
    formData.append('zone_cli', zone_cli);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('technician', technician);
    formData.append('id_user', userId); // Include user ID in the form data
    
    try {
      let result = await fetch("http://localhost:8000/api/addOrderByIdUser", {
        method: 'POST', 
        body: formData
      });
      if (result.ok) {
        alert("Order added successfully");
        // Optionally, reset form fields after successful submission
        setName_cli('');
        setPhone_cli('');
        setAdress_cli('');
        setZone_cli('');
        setDescription('');
        setPrice('');
        setTechnician('');
      } else {
        alert("Failed to add order. Please try again.");
      }
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add order. Please try again.");
    }
  }


  return (
    <div className='bg-dark'>
      <Header />
      <div className="container-fluid bg-light">
      <form className="row g-3 bg-light p-1 rounded">
      <div className="col-md-6">
        <label className="form-label">Client name</label>
        <input type="text" className="form-control"
        value={name_cli}
        onChange={(e)=>setName_cli(e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <label  className="form-label">Phone number</label>
        <input type="text" className="form-control"
        value={phone_cli}
        onChange={(e)=>setPhone_cli(e.target.value)}
        />
      </div>
      <div className="col-12">
        <label className="form-label">Address</label>
        <input type="text" className="form-control" placeholder="Address"
        value={adress_cli}
        onChange={(e)=>setAdress_cli(e.target.value)}
        />
      </div>
      <div className="col-12">
        <label className="form-label">Zone</label>
        <input type="text" className="form-control" placeholder="Zone"
        value={zone_cli}
        onChange={(e)=>setZone_cli(e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <label  className="form-label">Description</label>
        <textarea className="form-control"rows="4"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />
      </div>
      
      <div className="col-md-2">
        <label className="form-label">Price</label>
        <input type="text" className="form-control"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
        />
      </div>
      <div className="col-md-2">
      <label className="form-label">Technician ID</label>
      <input type="text" className="form-control"
      value={technician}
      onChange={(e)=>setTechnician(e.target.value)}
      />
    </div>
    <button onClick={add}>Submit</button>
    </form>
      </div>
    </div>
  );
};

export default Service;