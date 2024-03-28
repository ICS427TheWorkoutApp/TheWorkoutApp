import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class WorkoutsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'WorkoutsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      bodyPart: String,
      diffculty: String,
      details: String,
      video: String,
      createdAt: Date,
      owner: String,
    });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const Workouts = new WorkoutsCollection();
