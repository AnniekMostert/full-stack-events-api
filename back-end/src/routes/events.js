import { Router } from "express";
import getEvents from "../services/events/getEvents.js";
import createEvent from "../services/events/createEvent.js";
import getEventById from "../services/events/getEventById.js";
import deleteEventById from "../services/events/deleteEventById.js";
import updateEventById from "../services/events/updateEventById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { title, location } = req.query;
    const events = await getEvents(title, location);
    res.json(events);
  } catch (err) {
    next(err);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds,
    } = req.body;
    const newEvent = await createEvent(
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds
    );
    res.status(201).send({
      message: `Event succesfully created`,
      newEvent,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await getEventById(id);

    if (!event) {
      res.status(404).json({ message: `Event with id ${id} was not found` });
    } else {
      res.status(200).json(event);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEvent = await deleteEventById(id);

    if (!deletedEvent || deletedEvent.count === 0) {
      res.status(404).json({
        message: `Event with id ${id} was not found`,
      });
    } else {
      res.status(200).send({
        message: `Event with id ${id} is successfully deleted`,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds,
    } = req.body;
    const event = await updateEventById(id, {
      name,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds,
    });

    if (!event || event.count === 0) {
      res.status(404).json({
        message: `Event with id ${id} was not found`,
      });
    } else {
      res.status(200).send({
        message: `Event with id ${id} successfully updated`,
      });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
