import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Home.css';
import AppNavbar from './AppNavbar';
import hospitalImg from '../assets/Hospital.jpg';
import doctorImg from '../assets/doctor.jpg';
import patientImg from '../assets/patient.jpg';
import appointmentImg from '../assets/appointment.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <AppNavbar />

      {/* Banner */}
      <div className="home-banner d-flex align-items-center">
        <Container className="text-center text-white">
          <h1 className="display-4 fw-bold">Welcome to My Hospital</h1>
          <p className="lead">Your health is our highest priority.</p>
          <Button className="btn-gradient btn-lg" onClick={redirectToLogin}>
            Book an Appointment
          </Button>
        </Container>
      </div>

      {/* Services Section */}
      <Container className="mt-5">
        <h2 className="text-center mb-5">Our Services</h2>
        <Row className="g-4">
          {[{
            img: doctorImg,
            title: 'Expert Doctors',
            text: 'Certified doctors providing world-class healthcare with personalized attention.',
            btn: 'Meet Our Doctors'
          },{
            img: patientImg,
            title: 'Patient Care',
            text: 'We prioritize patient comfort and provide seamless healthcare experiences.',
            btn: 'Learn More'
          },{
            img: appointmentImg,
            title: 'Easy Appointments',
            text: 'Book, manage, and track your appointments with ease using our online system.',
            btn: 'Book Now'
          }].map((service, idx) => (
            <Col md={4} key={idx}>
              <Card className="h-100 shadow-sm service-card">
                <Card.Img variant="top" src={service.img} />
                <Card.Body className="text-center">
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.text}</Card.Text>
                  <Button className="btn-gradient" onClick={redirectToLogin}>
                    {service.btn}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* About Section */}
      <Container className="mt-5 mb-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img src={hospitalImg} alt="Hospital" className="img-fluid rounded shadow about-img" />
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <h2>World-Class Healthcare</h2>
            <p>
              We offer modern medical facilities, expert staff, and personalized care. 
              Book appointments, consult doctors, access your records — all in one place.
            </p>
            <Button className="btn-gradient" onClick={redirectToLogin}>Read More</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
