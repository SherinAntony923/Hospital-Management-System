import React from 'react';
import AppNavbar from './AppNavbar';
import { Container, Row, Col, Card } from 'react-bootstrap';
import patientImage from '../assets/patient.jpg';

const About = () => {
  return (
    <>
      <AppNavbar />

      {/* Hero Section */}
<div
  style={{
    background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: '120px 20px',
    textAlign: 'center',
  }}
>
  <h1 className="display-3 fw-bold mb-3">About Our Hospital</h1>
  <p className="lead fs-4">
    We’re committed to promoting your health through information, compassion, and care.
  </p>
</div>

      <Container className="py-5">
        {/* Importance of Health Section */}
        <Row className="align-items-center mb-5">
          <Col md={6}>
            <h2 className="mb-4 fw-bold">Why Health Matters in Daily Life</h2>
            <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#444' }}>
              Good health is the foundation of a fulfilling life. Nourishing your body, staying active,
              and caring for your mind are daily investments in your future well-being. Small
              habits—like balanced nutrition, movement, stress management, and regular checkups—help
              prevent illness, boost energy, and enhance mental clarity. Prioritizing your health today
              helps unlock a happier, more productive tomorrow.
            </p>
          </Col>
          <Col md={6} className="text-center">
            <img
              src={patientImage}
              alt="Patient"
              className="img-fluid rounded-4 shadow-lg border"
              style={{ maxHeight: '350px', objectFit: 'cover' }}
            />
          </Col>
        </Row>

        {/* Embedded YouTube Videos */}
        <h2 className="text-center mb-5 fw-bold">Featured Health Videos</h2>
        <Row className="g-4">
          <Col md={6}>
            <Card className="h-100 border-0 shadow-lg rounded-4">
              <div className="ratio ratio-16x9 rounded-top">
                <iframe
                  src="https://www.youtube.com/embed/QfRvmgvxwPs"
                  title="Lifestyle Medicine Benefits"
                  allowFullScreen
                ></iframe>
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fs-4 fw-bold">Benefits of Lifestyle Medicine</Card.Title>
                <Card.Text className="text-muted">
                  Understand how lifestyle medicine helps prevent and even reverse chronic diseases.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 border-0 shadow-lg rounded-4">
              <div className="ratio ratio-16x9 rounded-top">
                <iframe
                  src="https://www.youtube.com/embed/h_vmNyFqa7g"
                  title="Healthy Lifestyle Importance"
                  allowFullScreen
                ></iframe>
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fs-4 fw-bold">Importance of Daily Lifestyle</Card.Title>
                <Card.Text className="text-muted">
                  Learn why your everyday habits are vital for long-term physical and mental health.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Extra Styles */}
      <style>{`
        h2 {
          color: #007bff;
        }
        .card-title {
          color: #007bff;
        }
        .ratio iframe {
          border-radius: 12px;
        }
        p {
          font-family: 'Segoe UI', sans-serif;
        }
      `}</style>
    </>
  );
};

export default About;
