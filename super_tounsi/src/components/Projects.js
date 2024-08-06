import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/mechanic.jpeg";
import projImg2 from "../assets/img/plumber.jpeg";
import projImg3 from "../assets/img/electrician.jpeg";
import projImg4 from "../assets/img/cleaner.jpeg";
import projImg5 from "../assets/img/Ac.jpeg";
import projImg6 from "../assets/img/key.jpeg";
import w from "../assets/img/whatsapp.png"
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
export const Projects = () => {

  const services = [
    {
      title: "Mechanic",
      description: "“Mechanics are like wizards they understand the secret language of machines.” ",
      imgUrl: projImg1,
    },
    {
      title: "Plumber",
      description: "“Plumbers are like doctors for your pipes. We just don't wear the white coats.”",
      imgUrl: projImg2,
    },
    {
      title: "Electrician",
      description: "“A world without electricians would be in the dark ages.”",
      imgUrl: projImg3,
    },
    {
      title: "Cleaner",
      description: "“The time for cleaning is always now.”",
      imgUrl: projImg4,
    },
    {
      title: "Ac",
      description: "“I don't just fix ACs, I turn up the cool factor in your life.”",
      imgUrl: projImg5,
    },
    {
      title: "Locksmith",
      description: "“Unlocking mysteries, one key at a time.”",
      imgUrl: projImg6,
    },
  ];

  return (
    <section className="project" id="services">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Services</h2>
                <p>You can call us anytime at +216 54 033 591 or by contacting us by email or whatsapp
                <a href='https://wa.me/21654033591'><img src={w} alt="w" style ={{width:"32px",height:"32px",marginLeft:"10px"}}/></a> .</p>               
                <Tab.Container id="services-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Our services</Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item>
                      <Nav.Link eventKey="third">About us</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          services.map((service, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...service}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                   
                    <Tab.Pane eventKey="third">
                      <p>
                      "Welcome to our repair service, where every fix tells a story of dedication and expertise. Whether it's a flickering light, a leaky faucet, or a malfunctioning appliance, we're here to restore comfort and convenience to your home. Our skilled technicians approach each task with precision and care, ensuring that your problems are solved efficiently and effectively. From minor repairs to major overhauls, we're committed to delivering quality service that exceeds your expectations. Trust us to handle the job with professionalism and integrity, because at our repair service, your satisfaction is our top priority."</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
