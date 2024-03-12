import Joi from 'joi'

export const STUDENT_SCHEMA = Joi.object({
    name: Joi.string().max(20).required(),
    surename: Joi.string().required(),
}).required()
