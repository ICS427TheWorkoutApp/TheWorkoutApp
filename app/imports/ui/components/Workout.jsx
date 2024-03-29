import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

const Workout = ({ workout }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxTextLength = 150;
  const handleToggle = () => setIsExpanded(!isExpanded);

  const truncateText = (text) => {
    if (text.length > maxTextLength) {
      return `${text.substring(0, maxTextLength)}...`;
    }
    return text;
  };
  const textContainerStyle = {
    minHeight: '150',
  };
  return (
    <Card className="h-100" style={{ backgroundColor: 'white', border: 'none' }}>
      <Card.Header style={{ paddingBottom: '1em', backgroundColor: 'white', border: 'none' }}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video width="500" height="300" controls>
          <source src={workout.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Card.Title style={{ fontWeight: 'bold', paddingTop: '10px' }}>{workout.name} ({workout.diffculty})</Card.Title>
        <Card.Subtitle style={{ color: 'gray' }}>Body Part: {workout.bodyPart}</Card.Subtitle>
      </Card.Header>
      <Card.Body className="py-1" style={{ backgroundColor: 'white' }}>
        <Card.Text style={textContainerStyle}>
          {isExpanded ? workout.details : truncateText(workout.details)}
        </Card.Text>
        {workout.details.length > maxTextLength && (
          <Button onClick={handleToggle} variant="link" style={{ color: 'black' }}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

Workout.propTypes = {
  workout: PropTypes.shape({
    name: PropTypes.string,
    bodyPart: PropTypes.string,
    diffculty: {
      type: PropTypes.string,
      allowedValues: ['Very Easy', 'Easy', 'Medium', 'Hard'],
    },
    details: PropTypes.string,
    video: {
      type: PropTypes.string,
      optional: true,
    },
    createdAt: PropTypes.instanceOf(Date),
    owner: PropTypes.string,
  }).isRequired,
};

export default Workout;
