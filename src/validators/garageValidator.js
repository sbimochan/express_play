import Joi from 'joi';
import validate from '../utils/validate';
import * as garageService from '../services/garageService';

const SCHEMA = {
  name: Joi
    .string()
    .label('Name')
    .max(90)
    .required(),
  brand: Joi
    .string()
    .label('Brand')
    .max(15)
    .required(),
  year: Joi
    .number()
    .integer()
    .label('Make Year'),
  type: Joi
    .string()
    .label('Type of Vehicle')
    .required()
};

/**
 * Validate create/update vehicle request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function vehicleValidator(req, res, next) {
  return validate(req.body, SCHEMA).then(() => next()).catch(err => next(err));
}

/**
 * Validate vehicles existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findVehicle(req, res, next) {
  return garageService
    .getVehicle(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export {findVehicle, vehicleValidator};
