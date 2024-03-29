import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import FileField from '../components/FileField';
import { Workouts } from '../../api/workouts/Workouts';

const bridge = new SimpleSchema2Bridge(Workouts.schema);

const AddWorkout = () => {
  const [videoFile, setVideoFile] = useState(null);
  let fRef = null;

  const handleVideoChange = (file) => {
    setVideoFile(file);
  };

  const submit = (data) => {
    const { video, ...workoutData } = data;

    const insertWorkout = (finalWorkoutData) => {
      Meteor.call('workouts.insert', finalWorkoutData, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Workout added successfully', 'success');
        }
      });
    };

    if (videoFile) {
      const reader = new FileReader();
      reader.onloadend = function () {
        const fileData = reader.result;

        Meteor.call('uploadVideo', fileData, (err, videoUrl) => {
          if (err) {
            swal('Error', 'Failed to upload video.', 'error');
          } else {
            workoutData.video = videoUrl;
            insertWorkout(workoutData);
          }
        });
      };
      reader.readAsDataURL(videoFile);
    } else {
      insertWorkout(workoutData);
    }
  };

  return (
    <div>
      <Container className="py-3">
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Col xs={5}>
            <Col className="text-center"><h2>Add Workout</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card style={{ backgroundColor: 'white', border: 'none' }}>
                <Card.Body>
                  <SelectField inputClassName="border-dark" name="diffculty" placeholder="Please select" />
                  <TextField inputClassName="border-dark" name="name" />
                  <TextField inputClassName="border-dark" name="bodyPart" />
                  <div className="mb-3">
                    <FileField name="Video" onChange={handleVideoChange} />
                  </div>
                  <LongTextField inputClassName="border-dark" name="details" />
                  <ErrorsField />
                  <SubmitField inputClassName="p-2 bg-white border-1 rounded-1 mt-1" value="Submit" />
                  <HiddenField name="createdAt" value={new Date()} />
                  <HiddenField name="owner" value={Meteor.user()?.username} />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddWorkout;
