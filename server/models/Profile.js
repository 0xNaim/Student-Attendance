const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
  {
    user: {
      type: Object.Types.ObjectId,
      ref: 'User',
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: String,
  },
  { timestamps: true }
);

const Profile = model('Profile', profileSchema);
module.exports = Profile;
