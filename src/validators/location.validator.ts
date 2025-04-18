import Joi from "joi";

export const locationSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  country: Joi.string().required(),
  airportCode: Joi.string().required(),
  coordinates: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required()
  }).required()
});
