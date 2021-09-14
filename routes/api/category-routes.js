const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll()
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err), res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.body.id },
    include: {
      model: Product,
      attributes: ["id", "product_name", "price"],
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ msg: 'No products found in this category' });
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});


router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    { category_name: req.body.category_name },
    {
      where: { id: req.body.id },
    }
  )
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ msg: "Category doesnt exist" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.body.id },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ msg: "No catergory with that ID" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
