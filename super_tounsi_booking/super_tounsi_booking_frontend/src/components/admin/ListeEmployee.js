import React, { useEffect, useState } from 'react'
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ListeEmployee = () => {
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole]=useState('');
  const [emp,setEmp]=useState([]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {

    fetchEmp();
}, []);
const fetchEmp = async () => {
  try {
      const response = await fetch("http://localhost:8000/api/getAllUsers");
      const data = await response.json();
      setEmp(data);
  } catch (error) {
      console.error('Error:', error);
  }
};

  async function add() 
  {
    let item = { name, email,role, password };
    console.warn(item);
    let result = await fetch("http://localhost:8000/api/Signup", {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    result = await result.json();
  }

  async function deleteOperation(Id, name) {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}? This action will delete all related information as well.`);
    if (confirmDelete) {
        try {
            const response = await fetch(`http://localhost:8000/api/deleteUser/${Id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert("User and related data deleted successfully");
            fetchEmp();
            
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert("Failed to delete user. Please try again later.");
        }
    }
  }

  const handleUpdateClick = (item) => {
    setSelectedUser(item);
    setShowUpdateModal(true);
  };
  
  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    setSelectedUser(null);
  };

  const handleUpdate = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/updateUser/${selectedUser.Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedUser)
        });
  
        if (response.ok) {
            alert("User updated successfully");
            fetchEmp();
            handleUpdateClose();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update User');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        alert("Failed to update user. Please try again later.");
    }
  };
  

  return (
    <div className='bg-dark p-3'>
    <Header/>
     <h1 className='text-center text-light p-1 fs-3'>List of Emplyees</h1>
  
   <Button className='m-2' variant="primary" onClick={handleShow1}>
   Add employee
 </Button>

 <Modal show={show1} onHide={handleClose1}>
   <Modal.Header closeButton>
     <Modal.Title>Employee</Modal.Title>
   </Modal.Header>
   <Modal.Body>  
   <Form className=' row g-3'>
   <div className="col-md-10">
   <label className="form-label">Name</label>
   <input type="text" className="form-control" 
   value={name}
   onChange= {(e)=>setName(e.target.value)}
   />
 </div>
<div>
 <div className="col-10">
   <label  className="form-label">Email</label>
   <input type="text" className="form-control"  placeholder="Email"
   value={email}
   onChange= {(e)=>setEmail(e.target.value)}
   />
 </div>
 </div>
 <div>
 <div className="col-10">
   <label  className="form-label">Password</label>
   <input type="password" className="form-control" placeholder="Password"
   value={password}
   onChange= {(e)=>setPassword(e.target.value)}
   />
 </div>
 </div>

  <div className="col-10">
   <label  className="form-label">Role</label>
   <select className='Rectangle4' value={role} onChange={(e) => setRole(e.target.value)} required>
   <option value="">Select Role</option>
   <option value="admin">admin</option>
   <option value="user">user</option>
</select>
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
         <th>Name</th>
         <th>Email</th>
         <th>Role</th>
         <th>D/U</th>
         {/* Add more table headers as needed */}
     </tr>
 </thead>
 <tbody>
     { emp.map(item => (
         <tr key={item.Id}>
         <td>{item.Id}</td>
         <td>{item.name}</td>
         <td>{item.email}</td>
         <td>{item.role}</td>

             <td><button type="button" className="btn btn-outline-danger btn-sm"
             onClick={() => deleteOperation(item.Id, item.name)}
             >Delete</button>
             <div>
             <button type="button"
             className="btn btn-outline-success btn-sm"
            onClick={() => handleUpdateClick(item)}>Update</button>
             <Modal show={showUpdateModal} onHide={handleUpdateClose}>
             <Modal.Header closeButton>
               <Modal.Title>Update employee</Modal.Title>
             </Modal.Header>
             <Modal.Body>  
             <Form className=' row g-3'>
             <div className="col-md-10">
             <label className="form-label">Name</label>
             <input type="text" className="form-control" 
             value={selectedUser ? selectedUser.name : ''} 
            onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
             />
           </div>
          <div>
           <div className="col-10">
             <label  className="form-label">Email</label>
             <input type="text" className="form-control"  placeholder="Email"
             value={selectedUser ? selectedUser.email : ''} 
            onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
             />
           </div>
           </div>
           <div>

           </div>          
            <div className="col-10">
             <label  className="form-label">Role</label>
             <select className='Rectangle4'value={selectedUser ? selectedUser.role : ''} 
             onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})} required>
             <option value="">Select Role</option>
             <option value="admin">admin</option>
             <option value="user">user</option>
          </select>
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

export default ListeEmployee
