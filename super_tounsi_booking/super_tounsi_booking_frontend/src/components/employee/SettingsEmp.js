import React, { useState,useEffect } from 'react';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
const SettingsEmp = () => {
    const navigate = useNavigate();
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[cupass,setCupass]=useState('');
    const[cpass,setCpass]=useState('');
    const[role,setRole]=useState('');
    const [Id, setId] = useState('');

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user-info'));
      setId(user.Id);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
  }, []);
  const updateUserSettings = () => {
    // Check if new password matches the confirm password
    if (cupass !== cpass) {
        alert("Passwords don't match");
        return;
    }

    // Construct the request body
    const data = {
        Id: Id,
        name,
        email,
        password: cupass, // Assuming you want to update password too
        role
    };

    // Make a PUT request to update user data
    fetch(`http://localhost:8000/api/updateUserSettings/${Id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }if (response.ok) {
          alert("Order updated successfully");
          navigate('/Settings');
      }
        // Handle success, maybe redirect to a success page or show a success message
    })
    .catch(error => {
        console.error('Error updating user settings:', error);
        // Handle error, maybe show an error message to the user
    });
};
  return (
    <div className='bg-dark'>
    <Header />
    <div className='container-fluid bg-light'>
        <div className="mb-3">
            <label className="form-label fs-2 text-primary">Name</label>
            <input type="text" className="form-control" placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="mb-3">
            <label className="form-label fs-2 text-primary">Email address</label>
            <input type="email" className="form-control" placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="mb-3">
            <label className="form-label fs-2 text-primary">Role</label>
            <input type="text" className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled
            />
        </div>
        <div className="mb-3">
            <label className="form-label fs-2 text-primary">Password</label>
            <div>
                <label className="form-label fs-6">Current password</label>
                <input type="password" className="form-control" placeholder="Current Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label className="form-label fs-6">New password</label>
                <input type="password" className="form-control" placeholder="New Password"
                    value={cupass}
                    onChange={(e) => setCupass(e.target.value)}
                />
            </div>
            <div>
                <label className="form-label fs-6">Confirm new password</label>
                <input type="password" className="form-control" placeholder="Confirm New Password"
                    value={cpass}
                    onChange={(e) => setCpass(e.target.value)}
                />
            </div>
        </div>
        <Button variant="success" onClick={updateUserSettings}>
            Update
        </Button>
    </div>
</div>
);
}

export default SettingsEmp
