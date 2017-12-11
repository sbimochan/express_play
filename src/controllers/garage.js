import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as garageService from '../services/garageService';
import { findVehicle, vehicleValidator } from '../validators/garageValidator';

const router = Router();

/**
 * GET /api/vehicles
 */
router.get('/',(req,res,next)=>{
  garageService
  .getAllVehicles()
  .then(data => res.json({data}))
  .catch(err => next(err));
});

/**
 * GET /api/vehicles/:id
 */
router.get('/:id', (req, res, next) => {
  garageService
    .getVehicle(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/vehicles
 */
router.post('/', vehicleValidator, (req, res, next) => {
  garageService
    .createVehicle(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/vehicles/:id
 */
router.put('/:id', findVehicle, vehicleValidator, (req, res, next) => {
  garageService
    .updateVehicle(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/vehicles/:id
 */
router.delete('/:id', findVehicle, (req, res, next) => {
  garageService
    .deleteVehicle(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
