import { celebrate, Joi, Segments } from "celebrate";

export const createUserSchema = celebrate(
  {
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().trim(),
      email: Joi.string().email().required(),
    }),
  },
  {
    abortEarly: false,
  }
);

export const createAddressSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      userId: Joi.string().required().trim(),
      street: Joi.string().required().trim(),
      city: Joi.string().required().trim(),
      state: Joi.string().required().trim(),
      postal_code: Joi.string().required().trim(),
    }),
  },
  {
    abortEarly: false,
  }
);

export const updateAddressSchema = celebrate(
  {
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.number().integer().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      street: Joi.string().optional().trim(),
      city: Joi.string().optional().trim(),
      state: Joi.string().optional().trim(),
      postal_code: Joi.string().optional().trim(),
    }),
  },
  {
    abortEarly: false,
  }
);

export const createPostSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      userId: Joi.string().required().trim(),
      title: Joi.string().required().trim(),
      body: Joi.string().required().trim(),
    }),
  },
  {
    abortEarly: false,
  }
);
