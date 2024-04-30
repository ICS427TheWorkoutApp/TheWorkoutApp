import React, { useState } from 'react';
import { Carousel, Form, Row, Col, Pagination } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Event from '../components/Event';
import LoadingSpinner from '../components/LoadingSpinner';
import { Events } from '../../api/events/Events';

const EventDisplay = () => {
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const eventsPerPage = 3;

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setIndex(0);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1);
  };

  const { ready, events } = useTracker(() => {
    const eventsSubscription = Meteor.subscribe(Events.userPublicationName);
    const eventsReady = eventsSubscription.ready();
    const eventItems = Events.collection.find().fetch();
    return {
      events: eventItems,
      ready: eventsReady,
    };
  }, []);

  const filteredEvents = events.filter(event => event.title.toLowerCase().includes(searchInput.toLowerCase()));

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  const carouselItemStyle = {
    backgroundColor: 'black',
    height: '500px',
    color: 'white',
  };

  return ready ? (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect} style={{ backgroundColor: 'black' }}>
        {currentEvents.map((event) => (
          <Carousel.Item key={event._id} style={carouselItemStyle}>
            <Event
              event={event}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Form className="p-3">
        <Form.Group controlId="searchBar">
          <Row className="justify-content-center">
            <Col xs={6} md={4}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchChange}
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Row className="justify-content-center">
        <Col xs={12} className="p-3">
          <Pagination className="justify-content-center">{paginationItems}</Pagination>
        </Col>
      </Row>
    </div>
  ) : <LoadingSpinner />;
};

export default EventDisplay;
