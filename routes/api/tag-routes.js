const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll()
  .then(dbTags => {
    res.json(dbTags);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: "An error occurred", err })
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {include: [{model: Product, ProductTag}]})
  .then(dbTags => {
    res.json(dbTags);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: "An error occurred", err })
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(dbTags => {
    res.json(dbTags);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: "An error occurred", err })
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedTags => {
      res.json(updatedTags);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: "An error occurred", err })
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then (delTag => {
      res.json(delTag)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: "An error occurred", err })
    })
});

module.exports = router;
