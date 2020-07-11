const express = require('express');
const actionsRouter = express.Router();

const Actions = require('../data/helpers/actionModel');

const { validateAction } = require('../Middleware/actionsMiddleWare');

const { validateActionId } = require('../Middleware/actionsMiddleWare');

actionsRouter.get('/:id', (req, res) => {
  Actions.get(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => res.status(500).json({ error: 'could not get actions' }));
});

actionsRouter.post('/:id', validateAction, (req, res) => {
  Actions.insert(req.body)
    .then((updatedCount) => {
      res.status(201).json({ created: updatedCount });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'could not post action' });
    });
});

actionsRouter.put('/:id', validateActionId, validateAction, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((updatedAction) => res.status(201).json({ Updated: updatedAction }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ Error: 'could not update action' });
    });
});

actionsRouter.delete('/:id', validateActionId, (req, res) => {
  Actions.remove(req.params.id)
    .then((removed) => res.status(200).json({ removed: removed }))
    .catch((err) => {
      res.status(500).json({ error: 'could not delete action' });
    });
});

module.exports = actionsRouter;
