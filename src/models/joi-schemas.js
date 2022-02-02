import Joi from "joi";

export const UserSpec = {
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const LoginSpec = {
  email: Joi.string().required(),
  password: Joi.string().required(),
};

export const AddPlaylistSpec = {
  name: Joi.string().required(),
};

export const AddTrackSpec = {
  name: Joi.string().required(),
  artist: Joi.string().required(),
  duration: Joi.number().required().min(1).max(15),
};
