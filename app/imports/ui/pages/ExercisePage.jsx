import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

const ExercisePage = ({ exerciseId }) => {
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    Meteor.call('exercises.get', exerciseId, (error, result) => {
      if (!error) {
        setExercise(result);
      }
    });
  }, [exerciseId]);

  if (!exercise) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{exercise.name}</h1>
      <p>Body Part: {exercise.bodyPart}</p>
      <p>Description: {exercise.description}</p>
      <p>ID: {exercise._id}</p> {/* Display the exercise ID */}
      {/* Display other exercise data as needed */}
    </div>
  );
};

ExercisePage.propTypes = {
  exerciseId: PropTypes.string.isRequired,
};

export default ExercisePage;
