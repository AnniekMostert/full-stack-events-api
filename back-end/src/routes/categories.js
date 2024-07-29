import { Router } from "express";
import getCategories from "../services/categories/getCategories.js";
import createCategory from "../services/categories/createCategory.js";
import getCategoryById from "../services/categories/getCategoryById.js";
import deleteCategoryById from "../services/categories/deleteCategoryById.js";
import updateCategoryById from "../services/categories/updateCategoryById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await createCategory(name);

    res.status(201).send({
      message: `Category succesfully created`,
      newCategory,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);

    if (!category) {
      res.status(404).json({ message: `Category with id ${id} was not found` });
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await deleteCategoryById(id);

    if (!deletedCategory || deletedCategory.count === 0) {
      res.status(404).json({
        message: `Category with id ${id} was not found`,
      });
    } else {
      res.status(200).send({
        message: `Category with id ${id} successfully deleted`,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await updateCategoryById(id, { name });

    if (!category || category.count === 0) {
      res.status(404).json({
        message: `Category with id ${id} was not found`,
      });
    } else {
      res.status(200).send({
        message: `Category with id ${id} successfully updated`,
      });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
