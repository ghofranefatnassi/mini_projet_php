import React, { useState, useEffect } from 'react';
import Header from './Header';
import './style.css'
 const Home = () => {
  const [userCount, setUserCount] = useState(0);
  const [techCount, setTechCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [ordersOfTheDay, setOrdersOfTheDay] = useState([]);

  useEffect(() => {
      fetch('http://localhost:8000/api/getUserCount')
          .then(response => response.json())
          .then(data => {
              setUserCount(data.userCount);
          })
          .catch(error => {
              console.error('Error fetching user count:', error);
          });
          fetch('http://localhost:8000/api/getTechCount')
          .then(response => response.json())
          .then(data => {
              setTechCount(data.techCount);
          })
          .catch(error => {
              console.error('Error fetching user count:', error);
          });
          fetch('http://localhost:8000/api/getOrderCount')
          .then(response => response.json())
          .then(data => {
              setOrderCount(data.orderCount);
          })
          .catch(error => {
              console.error('Error fetching user count:', error);
          });
          fetch('http://localhost:8000/api/getOrdersOfTheDay')
          .then(response => response.json())
          .then(data => {
              setOrdersOfTheDay(data.ordersOfTheDay);
          })
          .catch(error => {
              console.error('Error fetching orders of the day:', error);
          });
  }, []);

    let time = new Date().toLocaleTimeString();
    const [CurentTime,SetCurentTime]=useState(time);
    const UpdateTime =()=>{
        let time = new Date().toLocaleTimeString();
        SetCurentTime(time);
    };
    setInterval(UpdateTime,1000);
  return (
    <div className='bg-dark'>
    <Header/>
    <div className='container-fluid'>
    <span className='fs-1' style={{color:"#fcf6f3",fontWeight:'bolder'}}>Dashbord</span>
      <div className='row g-3 my-2'>
      <div className='col-md-3 p-1 '>
          <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded'
           style={{backgroundColor:'#DAD4DE'}}>
            <div>
            <h3 className='fs-2' style={{color:"#f4f0e3"}}>EMPLOYEE</h3>
            <p className='f-2' style={{color:"#000000", fontWeight:"bold"}}>{userCount}</p>
            </div>
            <i className='bi bi-person-fill p-3 fs-1 ' style={{color:'#0b032f'}}></i>
          </div>
          </div>
          <div className='col-md-3 p-1'>
          <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded'
          style={{backgroundColor:'#BBB4DA'}}
          >
          <div>
          <h3 className='fs-2' style={{color:"#f4f0e3"}}>TECH</h3>
          <p className='f-2' style={{color:"#000000", fontWeight:"bold"}}>{techCount}</p>
          </div>
          <i className='bi bi-person-fill p-3 fs-1' style={{color:'#0b032f'}}/>
        </div>
        </div>
        <div className='col-md-3 p-1'>
        <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded'
        style={{backgroundColor:'#7B9DD2'}}
        >
          <div>
          <h3 className='fs-2' style={{color:"#f4f0e3"}}>History</h3>
          <p className='f-3' style={{color:"#000000", fontWeight:"bold"}}>{orderCount}</p>
          </div>
          <i className='bi bi-clock-history p-3 fs-1' style={{color:'#0b032f'}}></i>
        </div>
        </div>
        <div className='col-md-3 p-1'>
        <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded'
        style={{backgroundColor:'#212529'}}
        >
        
        <h1 className='fs-2' style={{color:'#caebff',textAlign:'center',justifyContent:'center',alignItems:"center"}}>{CurentTime}</h1>
        
        </div>
        </div>
      </div>
      
    </div>
    <table className="table caption-top bg-white rounded mt-2">
    <caption className='text-white fs-4'>Recent services</caption>
    <thead>
    <tr>
        <th>ID</th>
        <th>Client Name</th>
        <th>Phone</th>
        <th>Price</th>
        <th>Technician</th>
        <th>Date</th>
    </tr>
</thead>
<tbody>
    {ordersOfTheDay.map(order => (
        <tr key={order.id_ord}>
            <td>{order.id_ord}</td>
            <td>{order.name_cli}</td>
            <td>{order.phone_cli}</td>
            <td>{order.price}</td>
            <td>{order.technician}</td>
            <td>{order.Date}</td>
        </tr>
    ))}
</tbody>
</table>
    </div>

  )
}
export default Home; 
 