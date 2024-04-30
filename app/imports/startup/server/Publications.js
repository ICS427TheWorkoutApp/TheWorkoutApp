import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { Workouts } from '../../api/workouts/Workouts';
import { Events } from '../../api/events/Events';

Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(Workouts.userPublicationName, function () {
  if (this.userId) {
    return Workouts.collection.find();
  }
  return this.ready();
});

Meteor.publish(Events.userPublicationName, function () {
  if (this.userId) {
    return Events.collection.find();
  }
  return this.ready();
});

