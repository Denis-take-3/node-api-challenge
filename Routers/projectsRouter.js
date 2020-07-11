const projectRouter = require('express').Router();

const Projects = require('../data/helpers/projectModel');

const { validateProject } = require('../Middleware/projectsMiddleWare');

const { validateProjectId } = require('../Middleware/projectsMiddleWare');

projectRouter.get('/', (req, res) => {
  Projects.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => res.status(500).json({ Server_Error: 'could not get posts' }));
});

projectRouter.get('/:id', validateProjectId, (req, res) => {
  Projects.get(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => res.status(500).json({ Server_Error: 'could not get posts' }));
});

projectRouter.post('/', validateProject, (req, res) => {
  Projects.insert(req.body)
    .then((newPost) => res.status(201).json({ Created: newPost }))
    .catch((err) => {
      Error: 'could not post project';
    });
});

projectRouter.put('/:id', validateProjectId, validateProject, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((count) => {
      res
        .status(201)
        .json({ updated_ammount: count })
        .catch((err) => {
          error: 'could not update post';
        });
    })
    .catch((err) => {
      Error: 'could not update post';
    });
});

projectRouter.delete('/:id', validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then((deletedNum) => {
      res.status(200).json({ Ammount_of_deleted_users: deletedNum });
    })
    .catch((err) => {
      Error: 'could not remove post';
    });
});

module.exports = projectRouter;
