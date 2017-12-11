import Boom from 'boom';
import Garage from '../models/garage';

/**
 * Get all vehicles.
 *
 * @return {Promise}
 */
export function getAllVehicles() {
  return Garage.fetchAll();
}

/**
 * Get a vehicle.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getVehicle(id) {
  return new Garage({ id }).fetch().then(vehicle => {
    if (!vehicle) {
      throw new Boom.notFound('Vehicle not found');
    }

    return vehicle;
  });
}

/**
 * Create new vehicleObj.
 *
 * @param  {Object}  vehicleObj
 * @return {Promise}
 */
export function createVehicle(vehicleObj) {
  return new Garage({ name: vehicleObj.name, brand:vehicleObj.brand, year:vehicleObj.year, type:vehicleObj.type })
    .save().then(vehicleObj => vehicleObj.refresh());
}

/**
 * Update a vehicle.
 *
 * @param  {Number|String}  id
 * @param  {Object}         vehicle
 * @return {Promise}
 */
export function updateVehicle(id, vehicleObj) {
  return new Garage({ id })
    .save({ name: vehicleObj.name })
    .then(vehicleObj => vehicleObj.refresh());
}

/**
 * Delete a vehicle.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteVehicle(id) {
  return new Garage({ id }).fetch().then(vehicleObj => vehicleObj.destroy());
}
