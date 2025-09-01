import { pool } from '../helper/db.js';
import { Router } from 'express';

const router = Router();

// GET all tasks
router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM task', (err, result) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(result.rows || []);
  });
});

// CREATE a new task
router.post('/', (req, res, next) => {
  const { title } = req.body;
  pool.query('INSERT INTO task (title) VALUES ($1) RETURNING *', [title], (err, result) => {
    if (err) {
      return next(err);
    }
    res.status(201).json(result.rows[0]);
  });
});

// DELETE a task
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  pool.query('DELETE FROM task WHERE id = $1', [id], (err) => {
    if (err) {
      return next(err);
    }
    res.status(204).send();
  });
});

export default router;