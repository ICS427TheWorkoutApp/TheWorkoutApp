import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Pagination } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Workout from '../components/Workout';
import { Workouts } from '../../api/workouts/Workouts';

const WorkoutDisplay = () => {
  const profilesPerPage = 4;
  const profilesPerRow = 2;
  const [activePage, setActivePage] = useState(1);

  const { ready, workouts } = useTracker(() => {
    const subscription = Meteor.subscribe(Workouts.userPublicationName);
    const rdy = subscription.ready();
    const workoutItems = Workouts.collection.find({}).fetch();
    return {
      workouts: workoutItems,
      ready: rdy,
    };
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastProfile = activePage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = workouts.slice(indexOfFirstProfile, indexOfLastProfile);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(workouts.length / profilesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (ready ? (
    <div>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col md={10}>
            <Col className="text-center">
              <h1 style={{ marginBottom: '1em', marginTop: '1em', fontWeight: 'bold' }}>Workout Collection</h1>
            </Col>
            <Row xs={1} md={2} lg={profilesPerRow} className="g-5">
              {currentProfiles.map((workout) => <Col key={workout._id}><Workout workout={workout} /></Col>)}
            </Row>
            {pageNumbers.length > 1 && (
              <Pagination className="justify-content-center mt-3">
                {pageNumbers.map(number => (
                  <Pagination.Item key={number} active={number === activePage} onClick={() => handlePageChange(number)}>
                    {number}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />);
};

export default WorkoutDisplay;
