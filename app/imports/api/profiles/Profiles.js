import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ProfilesCollection {
  constructor() {
    this.name = 'ProfilesCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      email: { type: String, index: true, unique: true },
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      bio: { type: String, optional: true },
      picture: { type: String, optional: true },
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const Profiles = new ProfilesCollection();
