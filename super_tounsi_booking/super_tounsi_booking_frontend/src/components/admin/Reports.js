import React, { useEffect, useState , useRef} from 'react';
import Header from './Header'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import nos from '../../image/nos.png'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

 const Reports = () => {
  const conponentPDF = useRef();
  const generatePDF = (order) => {
    const doc = new jsPDF();
    doc.text("Order Details", 10, 10);
    const rowData = [
      ['ID', order.id_ord],
      ['Client Name', order.name_cli],
      ['Phone', order.phone_cli],
      ['Address', order.adress_cli],
      ['Zone', order.zone_cli],
      ['Description', order.description],
      ['Price', order.price],
      ['Technician', order.technician],
      ['Progress', order.progress],
      ['Date', order.Date]
    ];
    doc.autoTable({
      body: rowData
    });
    doc.save(`Order_${order.id_ord}.pdf`);
  };

  const handlePrintClick = (order) => {
    setSelectedOrder(order);
    generatePDF(order);
  };


    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleUpdateClick = (order) => {
      setSelectedOrder(order);
      setShowUpdateModal(true);
    };
    
    const handleUpdateClose = () => {
      setShowUpdateModal(false);
      setSelectedOrder(null);
    };


useEffect(() => {
 
   fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getAllOrder");
      const data = await response.json();
      setOrders(data);
  } catch (error) {
      console.error('Error fetching categories:', error);
  }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterOrders(e.target.value);
};

const filterOrders = (searchTerm) => {
    const filteredOrders = orders.filter(order =>
        order.name_cli.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id_ord.toString().includes(searchTerm) ||
        order.phone_cli.includes(searchTerm)
        // Add additional criteria such as date filtering if needed
    );
    setSearchResults(filteredOrders);
};

const cancelOrder = async (id_ord) => {
      try {
        const response = await fetch(`http://localhost:8000/api/cancelOrder/${id_ord}`, {
            method: 'PUT'
        });
        if (response.ok) {
            const updatedOrders = orders.map(order => {
                if (order.id_ord === id_ord) {
                    return { ...order, progress: 'Cancel' };
                }
                return order;
            });
            setOrders(updatedOrders);
            fetchOrders();
        }
    } catch (error) {
        console.error('Error canceling order:', error);
        console.log(id_ord);
    }
};

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/updateOrder/${selectedOrder.id_ord}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(selectedOrder)
      });
  
        if (response.ok) {
            alert("Order updated successfully");
            fetchOrders();
            handleUpdateClose();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update order');
        }
    } catch (error) {
        console.error('Error updating order:', error);
        alert("Failed to update order. Please try again later.");
    }
  };

  return (
    <div className='bg-dark'>
    <Header />
  <div className='className="row g-3 bg-light p-1 rounded'>
  <div className="col-md-4">
  <input type="text" className="form-control" placeholder='search...' required
  value={searchTerm}
        onChange={handleSearch}
  />
</div>
<div ref={conponentPDF} style={{ width: '100%' }}>
    <table className="table caption-top bg-white rounded mt-2" >
        <thead>
            <tr>
                <th>ID</th>
                <th>Client Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Zone</th>
                <th>Description</th>
                <th>Price</th>
                <th>Technician</th>
                <th>Progress</th>
                <th>Date</th>
                <th>D/U</th>
                {/* Add more table headers as needed */}
            </tr>
        </thead>
        <tbody>
            {searchResults.map(order => (
                <tr key={order.id_ord} >
                    <td>{order.id_ord}</td>
                    <td>{order.name_cli}</td>
                    <td>{order.phone_cli}</td>
                    <td>{order.adress_cli}</td>
                    <td>{order.zone_cli}</td>
                    <td>{order.description}</td>
                    <td>{order.price}</td>
                    <td>{order.technician}</td>
                    <td>{order.progress}</td>
                    <td>{order.Date}</td>
                    <td>
                    
                    <button type="button"
                     className="btn btn-outline-primary btn-sm"  onClick={() => handlePrintClick(order)}>Print</button>
                     <div>
                    <button  type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => cancelOrder(order.id_ord)}>Cancel</button>
                    </div>
                    <div>
                    <button type="button"
                    className="btn btn-outline-success btn-sm"
                   onClick={() => handleUpdateClick(order)}>Update</button>
                  
                    <Modal show={showUpdateModal} onHide={handleUpdateClose}>
             <Modal.Header closeButton>
               <Modal.Title>Update order</Modal.Title>
             </Modal.Header>
             <Modal.Body>  
             <Form className="row g-3 bg-light p-1 rounded">
             <div className="col-md-6">
               <label className="form-label">Client name</label>
               <input type="text" className="form-control"
               value={selectedOrder ? selectedOrder.name_cli : ''} 
            onChange={(e) => setSelectedOrder({...selectedOrder, name_cli: e.target.value})}
               />
             </div>
             <div className="col-md-6">
               <label  className="form-label">Phone number</label>
               <input type="text" className="form-control"
               value={selectedOrder ? selectedOrder.phone_cli : ''} 
            onChange={(e) => setSelectedOrder({...selectedOrder, phone_cli: e.target.value})}
               />
             </div>
             <div className="col-md-6">
               <label className="form-label">Address</label>
               <input type="text" className="form-control" placeholder="Address"
               value={selectedOrder ? selectedOrder.adress_cli : ''} 
            onChange={(e) => setSelectedOrder({...selectedOrder, adress_cli: e.target.value})}
               />
             </div>
             <div className="col-md-6">
               <label className="form-label">Zone</label>
               <input type="text" className="form-control" placeholder="Zone"
               value={selectedOrder ? selectedOrder.zone_cli : ''} 
            onChange={(e) => setSelectedOrder({...selectedOrder, zone_cli: e.target.value})}
               />
             </div>
             
             <div className="col-md-4">
             <label className="form-label">Progress</label>
             <select className='form-control' value={selectedOrder ? selectedOrder.progress : ''} 
             onChange={(e) => setSelectedOrder({...selectedOrder, progress: e.target.value})} required>
             <option value="">Progress</option>
             <option value="In progress">In progress</option>
             <option value="Complete">Complete</option>
          </select>
             </div>
             <div className="col-md-4">
               <label className="form-label">Price</label>
               <input type="text" className="form-control"
               value={selectedOrder ? selectedOrder.price : ''} 
               onChange={(e) => setSelectedOrder({...selectedOrder, price: e.target.value})}
               />
             </div>
             <div className="col-md-4">
               <label className="form-label">Technician ID</label>
             <input type="text" className="form-control"
             value={selectedOrder ? selectedOrder.technician : ''} 
             onChange={(e) => setSelectedOrder({...selectedOrder, technician: e.target.value})}
                />
              </div>
             
             <div className="col-md-6">
               <label  className="form-label">Description</label>
               <textarea className="form-control"rows="4"
               value={selectedOrder ? selectedOrder.description : ''} 
            onChange={(e) => setSelectedOrder({...selectedOrder, description: e.target.value})}
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
    </div>
    </div>
  )
}
export default Reports