import React, { useEffect, useState } from 'react'
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ListTechnicians = () => {

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);


  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [adress,setAdress]=useState('');
  const [zone,setZone]=useState('');
  const [type,setType]=useState('');
  const [price_15,setPrice_15]=useState('');
  const[namecat,setNamecat]=useState('');
  const [cat,setCat]=useState([]);
  const [tec,setTec]=useState([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/listcat");
            const data = await response.json();
            setCat(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    const fetchTech = async () => {
      try {
          const response = await fetch("http://localhost:8000/api/listTech");
          const data = await response.json();
          setTec(data);
      } catch (error) {
          console.error('Error fetching technician:', error);
      }
  };

    fetchCategories();
    fetchTech();
}, []);

const handleUpdateClick = (item) => {
  setSelectedTechnician(item);
  setShowUpdateModal(true);
};

const handleUpdateClose = () => {
  setShowUpdateModal(false);
  setSelectedTechnician(null);
};

const handleUpdate = async () => {
  try {
      const response = await fetch(`http://localhost:8000/api/updateTech/${selectedTechnician.id_tech}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(selectedTechnician)
      });

      if (response.ok) {
          alert("Technician updated successfully");
          fetchTech();
          handleUpdateClose();
      } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update technician');
      }
  } catch (error) {
      console.error('Error updating technician:', error);
      alert("Failed to update technician. Please try again later.");
  }
};


async function fetchTech ()
{
  let response = await fetch("http://localhost:8000/api/listTech");
  let data = await response.json();
  setTec(data);
}

async function addCat() {
  console.warn(namecat);
  const formData1 = new FormData();
  formData1.append('namecat', namecat);
  let result = await fetch("http://localhost:8000/api/addCategory", {
    method: 'POST',
    body: formData1
  });
  alert("category added successfully");
  console.log(result);
}

async function add() {
  console.warn(name, phone, adress, zone, type, price_15);
  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('adress', adress);
  formData.append('zone', zone);
  formData.append('type', type);
  formData.append('price_15', price_15);
  let result = await fetch("http://localhost:8000/api/addTech", {
    method: 'POST',
    body: formData
  });
  alert("Technician added successfully");
  console.log(result);
}
async function deleteOperation(id_tech, name) {
  const confirmDelete = window.confirm(`Are you sure you want to delete ${name}? This action will delete all related information as well.`);
  if (confirmDelete) {
      try {
          const response = await fetch(`http://localhost:8000/api/deleteTech/${id_tech}`, {
              method: 'DELETE'
          });
          if (response.ok) {
              alert("Technician and related data deleted successfully");
              fetchTech();
          } else {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Failed to delete technician');
          }
      } catch (error) {
          console.error('Error deleting technician:', error);
          alert("Failed to delete technician. Please try again later.");
      }
  }
}

  return (
    <div className='bg-dark p-3'>
    <Header/>
     <h1 className='text-center text-light p-1 fs-3'>List of Technicians</h1>
     <Button variant="primary" onClick={handleShow}>
     Add category
   </Button>

   <Modal show={show} onHide={handleClose}>
     <Modal.Header closeButton>
       <Modal.Title>Category</Modal.Title>
     </Modal.Header>
     <Modal.Body>  
     <Form>
     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
       <Form.Label>Name</Form.Label>
       <Form.Control
         type="text"
         placeholder="category"
         value={namecat}
         onChange={(e)=>setNamecat(e.target.value)}
       />
     </Form.Group>
     </Form>
       </Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={handleClose}>
         Close
       </Button>
       <Button variant="primary" onClick={addCat}>
         Add
       </Button>
     </Modal.Footer>
   </Modal>
   <Button className='m-2' variant="primary" onClick={handleShow1}>
   Add technician
 </Button>

 <Modal show={show1} onHide={handleClose1}>
   <Modal.Header closeButton>
     <Modal.Title>Technician</Modal.Title>
   </Modal.Header>
   <Modal.Body>  
   <Form className=' row g-3'>
   <div className="col-md-5">
   <label className="form-label">Name</label>
   <input type="text" className="form-control" 
   value={name}
   onChange= {(e)=>setName(e.target.value)}
   />
 </div>
 <div className="col-md-5">
 <label  className="form-label">Phone number</label>
 <input type="text" className="form-control"
 value={phone}
   onChange= {(e)=>setPhone(e.target.value)}
    />
</div>
<div>
 <div className="col-10">
   <label  className="form-label">Address</label>
   <input type="text" className="form-control"  placeholder="Address"
   value={adress}
   onChange= {(e)=>setAdress(e.target.value)}
   />
 </div>
 </div>
 <div>
 <div className="col-10">
   <label  className="form-label">Zone</label>
   <input type="text" className="form-control" placeholder="Zone"
   value={zone}
   onChange= {(e)=>setZone(e.target.value)}
   />
 </div>
 </div>
 <div className="col-md-5">
 <label className="form-label">Category</label>
 <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
   <option value="">Select Category</option>
   {cat.map((category, index) => (
     <option key={index} value={category.id}>{category.namecat}</option>
   ))}
 </select>
</div>
  <div className="col-md-5">
   <label  className="form-label">price/15min</label>
   <input type="text" className="form-control"
   value={price_15}
   onChange= {(e)=>setPrice_15(e.target.value)}
    />
 </div>  
   </Form>
     </Modal.Body>
   <Modal.Footer>
     <Button variant="secondary" onClick={handleClose1}>
       Close
     </Button>
     <Button variant="primary" onClick={add}>
       Add
     </Button>
   </Modal.Footer>
 </Modal>
 <table className="table caption-top bg-white rounded mt-2">
 <thead>
     <tr>
     <th>ID</th>
     <th >Name</th>
     <th >Phone</th>
     <th >Address</th>
     <th >Zone</th>
     <th >Type</th>
     <th >Price/15min</th>
     <th >D/U</th>
     </tr>
 </thead>
 <tbody>
     { tec.map(item => (
         <tr key={item.id_tech}>
         <td>{item.id_tech}</td>
         <td>{item.name}</td>
         <td>{item.phone}</td>
         <td>{item.adress}</td>
         <td>{item.zone}</td>
         <td>{item.type}</td>
         <td>{item.price_15}</td>

             <td>
             <button type="button" className="btn btn-outline-danger btn-sm" 
             onClick={() => deleteOperation(item.id_tech, item.name)}>Delete</button>
             <div>
             <button
              type="button"
              className="btn btn-outline-success btn-sm"
             onClick={() => handleUpdateClick(item)}
              >
              Update
               </button>
             <Modal show={showUpdateModal} onHide={handleUpdateClose}>
                 <Modal.Header closeButton>
                 <Modal.Title>Update technician</Modal.Title>
                 </Modal.Header>
                     <Modal.Body>  
                      <Form className=' row g-3'>
                      <div className="col-md-5">
                      <label className="form-label">Name</label>
                      <input 
                      type="text" 
                      className="form-control" 
                      value={selectedTechnician ? selectedTechnician.name : ''} 
                      onChange={(e) => setSelectedTechnician({...selectedTechnician, name: e.target.value})}
                    />
                            </div>
                          <div className="col-md-5">
                             <label  className="form-label">Phone number</label>
                             <input 
                             type="text" 
                             className="form-control" 
                             value={selectedTechnician ? selectedTechnician.phone : ''} 
                             onChange={(e) => setSelectedTechnician({...selectedTechnician, phone: e.target.value})}
                           />
                         
                                </div>
                            <div>
                              <div className="col-10">
   <label  className="form-label">Address</label>
   <input 
   type="text" 
   className="form-control" 
   value={selectedTechnician ? selectedTechnician.adress : ''} 
   onChange={(e) => setSelectedTechnician({...selectedTechnician, adress: e.target.value})}
 />
 </div>
 </div>
 <div>
 <div className="col-10">
   <label  className="form-label">Zone</label>
   <input 
   type="text" 
   className="form-control" 
   value={selectedTechnician ? selectedTechnician.zone : ''} 
   onChange={(e) => setSelectedTechnician({...selectedTechnician, zone: e.target.value})}
 />
 </div>
 </div>
 <div className="col-md-5">
 <label className="form-label">Category</label>
 <select className="form-select"  value={selectedTechnician ? selectedTechnician.type : ''} 
 onChange={(e) => setSelectedTechnician({...selectedTechnician, type: e.target.value})}>
   <option value="">Select Category</option>
   {cat.map((category, index) => (
     <option key={index} value={category.id}>{category.namecat}</option>
   ))}
 </select>
</div>
  <div className="col-md-5">
   <label  className="form-label">price/15min</label>
   <input 
   type="text" 
   className="form-control" 
   value={selectedTechnician ? selectedTechnician.price_15 : ''} 
   onChange={(e) => setSelectedTechnician({...selectedTechnician, price_15: e.target.value})}
 />
                   </div>  
   </Form>
     </Modal.Body>
                                <Modal.Footer>
                           <Button variant="secondary" onClick={handleUpdateClose}>
                             Close
                            </Button>
                           <Button variant="success" onClick={handleUpdate}>
                            Update
                         </Button>
                       </Modal.Footer>
                         </Modal>


             </div>
             </td>
         </tr>
     ))}
 </tbody>
</table>
</div>

  )
}
export default ListTechnicians;