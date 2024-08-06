import React, { useState ,useEffect} from 'react'
import Header from './Header'

const DashboardEmp = () => {

  const[name_cli,setName_cli]=useState('');
  const[phone_cli,setPhone_cli]=useState('');
  const[adress_cli,setAdress_cli]=useState('');
  const[zone_cli,setZone_cli]=useState('');
  const[description,setDescription]=useState('');
  const [tech, setTech] = useState([]);
  const[technician,setTechnician]=useState("");
  const[type,setType]=useState('');
  const [cat,setCat]=useState([]);
  const[price,setPrice]=useState('');
  const[progress,setProgress]=useState('');
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
  const fetchTechnicians = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/getTechCat/${type}`);
      const data = await response.json();
          setTech(data);
      } catch (error) {
          console.error('Error fetching categories:', error);
      }
  };
    fetchCategories();
    fetchTechnicians();
  },[type]);

  async function add() {
    console.warn(name_cli, phone_cli, adress_cli, zone_cli,description, price, technician,progress);
    const formData = new FormData();
    formData.append('name_cli', name_cli);
    formData.append('phone_cli', phone_cli);
    formData.append('adress_cli', adress_cli);
    formData.append('zone_cli', zone_cli);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('technician', technician);
    formData.append('progress', progress);
    try {
      let result = await fetch("http://localhost:8000/api/addOrder", {
        method: 'POST', 
        body: formData
      });
      if (result.ok) {
        alert("Order added successfully");
      } else {
        alert("Failed to add order. Please try again.");
      }
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className='bg-dark p-3'>
      <Header/>
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
  <label className="form-label">Progress</label>
  <select className='Rectangle4'value={progress}
  onChange={(e)=>setProgress(e.target.value)} required>
  <option value="">Progress</option>
  <option value="In progress">In progress</option>
  <option value="Complete">Complete</option>
</select>
  </div>
  <h2>Technicians</h2>
  <div className="col-md-5">
<label className="form-label">Category</label>
<select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
<option value="">Select Category</option>
{cat.map((category, index) => (
<option key={index} value={category.id}>{category.namecat}</option>
))}
</select>
</div>
  <table className="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Zone</th>
      </tr>
    </thead>
    <tbody>
      {tech.map(technicians => (
        <tr key={technicians.id_tech}>
          <td>{technicians.id_tech}</td>
          <td>{technicians.name}</td>
          <td>{technicians.phone}</td>
          <td>{technicians.adress}</td>
          <td>{technicians.zone}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="col-md-2">
  <label className="form-label">Technician ID</label>
  <input type="text" className="form-control"
  value={technician}
  onChange={(e)=>setTechnician(e.target.value)}
  />
</div>
  <div className="col-12">
    <button type="submit" className="btn btn-primary"
     onClick={add}>Save</button>
  </div>
</form>


    </div>
  )
}

export default DashboardEmp
