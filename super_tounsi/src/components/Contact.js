import { useState,useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
export const Contact = () => {
const[name,setName]=useState('');
const[email,setEmail]=useState('');
const[phone,setPhone]=useState('');
const[subject,setSabject]=useState('');
const[message,setMessage]=useState('');
const[category,setCategory]=useState('');
const [cat,setCat]=useState([]);

const formData = new FormData();
formData.append('name', name);
formData.append('email', email);
formData.append('phone', phone);
formData.append('subject', subject);
formData.append('message', message);
formData.append('category', category);

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
  fetchCategories();
}, []);



const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await fetch('http://localhost:8000/api/submitForm', {
          method: 'POST',
          body: formData
      });
      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('Error submitting form:', error);
  }
};
 
  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Get In Touch</h2>
                <form >
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                    <labes>Full name</labes>
                      <input type="text"  placeholder="Full Name"
                      value={name} onChange={(e)=>setName(e.target.value)}
                      />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                    <labes>Phone</labes>
                    <input type="text"  placeholder="Phone"
                    value={phone} onChange={(e)=>setPhone(e.target.value)}
                    />
                  </Col>
                    <Col size={12} sm={6} className="px-1">
                    <labes>Subject</labes>
                      <input type="text" placeholder="Subject"
                      value={subject} onChange={(e)=>setSabject(e.target.value)}
                      />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                    <labes>Category</labes>
                    <div>
                    <select className="form-select"  value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {cat.map((category, index) => (
                      <option key={index} value={category.id}>{category.namecat}</option>
                    ))}
                  </select>
                  </div>
                    </Col>
                    <div>
                    <Col size={12} sm={12} className="px-1">
                    <labes>E-mail</labes>
                      <input type="email"placeholder="Email"
                      value={email} onChange={(e)=>setEmail(e.target.value)}
                      />
                    </Col>
                    </div>
                    <Col size={12} className="px-1">
                    <labes>Message</labes>
                      <textarea rows="6" placeholder="Message"
                      value={message} onChange={(e)=>setMessage(e.target.value)}
                      ></textarea>
                      <button type="submit"  className="vvd rounded" onClick={handleSubmit}><span>Send</span></button>
                    </Col>
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
