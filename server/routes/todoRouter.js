import { pool } from '../helper/db.js';
import { Router } from 'express';
import { auth } from '../helper/auth.js'

const router = Router();

router.get('/', (req, res, next) => { 
  pool.query('SELECT * FROM task', (err, result) => {
  if (err) {
    return next(err)
  }
  res.status(200).json(result.rows || [])
})
})

router.post('/create', auth, (req, res, next) => {
  const { task } = req.body

  if (!task) {
    return res.status(400).json({ error: 'Task is required' })
  }

  pool.query(
    'INSERT INTO task (description) VALUES ($1) RETURNING *',
    [task.description],
    (err, result) => {
      if (err) {
        return next(err)
      }
      res.status(201).json({ id: result.rows[0].id, description: task.description })
    }
  )
})


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
  const { description } = req.body;

  pool.query(
    'INSERT INTO task (description) VALUES ($1) RETURNING *',
    [description],
    (err, result) => {
      if (err) return next(err);
      res.status(201).json(result.rows[0]);
    }
  );
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