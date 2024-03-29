import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="bg-light">
      <Container className="text-center">
        <h1 style={{ paddingTop: '20px', color: 'darkgreen', fontSize: '36pt' }}>
          Welcome to the Workout App
        </h1>
        <h3 style={{ paddingBottom: '20px', color: 'darkgreen' }}>
          View and share your workout routines with others!
        </h3>
      </Container>
    </div>
    <div className="landing-green-background">
      <Container className="justify-content-center text-center">
        <h2 className="py-5" style={{ color: 'white' }}>Start off by signing up...</h2>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <Image
              src="/images/TWA Sign In.png"
              width="80%"
              height="80%"
              className="image-spacing"
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}
            />
            <h5 className="m-3 text-white">Sign Up</h5>
          </Col>
          <Col xs={6}>
            <Image
              src="/images/TWA Sign Up.png"
              width="80%"
              height="80%"
              className="image-spacing"
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}
            />
            <h5 className="m-3 text-white">Sign In</h5>
          </Col>
        </Row>
      </Container>
    </div>

    <div className="py-5 landing-white-background  text-center">
      <h2 className="p-4" style={{ color: 'darkgreen' }}>
        View and Add Your Own Workout!
      </h2>
      <Container>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <h5 className="m-3 text-dark">Add Workout</h5>
            <Image
              src="/images/TWA AddWorkout.png"
              width="80%"
              height="80%"
              className="image-spacing"
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}
            />
          </Col>
          <Col xs={6}>
            <h5 className="m-3 text-dark">Workout Display</h5>
            <Image
              src="/images/TWA WorkoutDisplay.png"
              width="80%"
              height="80%"
              className="image-spacing"
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default Landing;
