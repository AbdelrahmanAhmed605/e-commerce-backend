const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags and their associated products
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id` and its associated products
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // Checks if a tag with the specified ID is found
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      tag_name: "rock music",
      productIds: [1, 2, 3, 4]
    }
  */
  try {
    const tagData = await Tag.create(req.body);
    // if there's products associated with the new tag, we need to create pairings to bulk create in the ProductTag model
    if (req.body.productIds.length) {
      const productTagIdArr = req.body.productIds.map((product_id) => {
        return {
          product_id,
          tag_id: tagData.id,
        };
      });
      const productTagData = await ProductTag.bulkCreate(productTagIdArr);
      // send both tagData and productTagData in a single JSON object
      res.status(200).json({ tagData, productTagData });
    } else {
      // if there are no associated products for the new tag, just respond with tagData
      res.status(200).json(tagData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update tag data
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // find all products associated with this specified tag from ProductTag
    const productTags = await ProductTag.findAll({
      where: {
        tag_id: req.params.id,
      },
    });

    // get a list of the product_ids currently associated with this tag
    const currentProductId = productTags.map(({ product_id }) => product_id);

    // create a filtered list of new tag_ids that are not already associated with the product
    const newProductTags = req.body.productIds
      .filter((product_id) => !currentProductId.includes(product_id))
      .map((product_id) => {
        return {
          product_id,
          tag_id: req.params.id,
        };
      });

    // create a list of productTagIds that need to be removed from the database (existing productTags that have product_ids no longer listed in the update)
    const productTagsToRemove = productTags
      .filter(({ product_id }) => !req.body.productIds.includes(product_id))
      .map(({ id }) => id);

    // run both actions (delete and create associations)
    const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.status(200).json(updatedProductTags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Checks if a product with the specified ID is found
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
