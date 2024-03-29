import React from 'react';
import { Col, Container } from 'react-bootstrap';

/* The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="footer mt-auto py-3 bg-dark">
    <Container>
      <Col className="text-center" style={{ color: 'white' }}>
        The Workout App
        {' '}
        <br />
        ICS 427
        <br />
        Zhuocheng Gan, Conor Sonoda
        {' '}
        <br />
        <a style={{ color: 'white' }} href="https://github.com/ICS427TheWorkoutApp/TheWorkoutApp">Github Link</a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
