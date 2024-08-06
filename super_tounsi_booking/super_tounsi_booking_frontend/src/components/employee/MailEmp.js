import React, { useEffect, useState } from 'react';
import Header from './Header'
const MailEmp = () => {
  const [mail,setMail]=useState([]);
    useEffect(() => {
        fetchMail ();
    }, []);
async function fetchMail ()
{
  let response = await fetch("http://localhost:8000/api/getContacts");
  let data = await response.json();
  setMail(data);
}
  return (
    <div className='bg-dark'>
    <Header/>
    <table className="table caption-top bg-white rounded mt-2">
<thead>
   <tr>
   <th>ID</th>
   <th >Name</th>
   <th >Email</th>
   <th >Phone</th>
   <th >Subject</th>
   <th >Message</th>
   <th >Date</th>

   </tr>
</thead>
<tbody>
   { mail.map(item => (
       <tr key={item.id_con}>
       <td>{item.id_con}</td>
       <td>{item.name}</td>
       <td>{item.email}</td>
       <td>{item.phone}</td>
       <td>{item.subject}</td>
       <td>{item.message}</td>
       <td>{item.Date}</td>
      
       </tr>
   ))}
</tbody>
</table>
  </div>
  )
}

export default MailEmp
