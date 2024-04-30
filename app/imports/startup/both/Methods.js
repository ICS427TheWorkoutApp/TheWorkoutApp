import { Meteor } from 'meteor/meteor';
import cloudinary from 'cloudinary';
import { Profiles } from '../../api/profiles/Profiles';
import { Workouts } from '../../api/workouts/Workouts';

cloudinary.config({
  cloud_name: 'YOUR-KEY-HERE',
  api_key: 'YOUR-KEY-HERE',
  api_secret: 'YOUR-KEY-HERE',
});

const updateProfileMethod = 'Profiles.update';

Meteor.methods({
  'Profiles.update'({ email, firstName, lastName, bio, picture }) {
    Profiles.collection.update({ email }, { $set: { email, firstName, lastName, bio, picture } });
  },
});

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  'workouts.insert'(workoutData) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    Workouts.collection.insert(workoutData);
  },

  // eslint-disable-next-line meteor/audit-argument-checks
  async uploadImage(imageData) {
    this.unblock();
    try {
      const result = await cloudinary.v2.uploader.upload(imageData, { resource_type: 'auto' });
      return result.secure_url;
    } catch (error) {
      console.log(error);
      throw new Meteor.Error('cloudinary-upload-failed', 'Error uploading to Cloudinary');
    }
  },

  // eslint-disable-next-line meteor/audit-argument-checks
  async uploadVideo(videoData) {
    this.unblock();

    try {
      // Specify the resource_type as 'video' to ensure Cloudinary handles it as a video
      const result = await cloudinary.v2.uploader.upload(videoData, { resource_type: 'video' });
      return result.secure_url;
    } catch (error) {
      throw new Meteor.Error('cloudinary-upload-failed', 'Error uploading video to Cloudinary');
    }
  },
});

export { updateProfileMethod };
