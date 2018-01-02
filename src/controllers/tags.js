import { Router } from 'express';
import * as tagsService from '../services/tagsService';

const router = Router();

router.get('/', (req, res, next) => {
  tagsService
    .tags()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  tagsService
    .todosOfTags(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});
export default router;
