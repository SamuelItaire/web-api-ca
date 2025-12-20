import express from 'express';
import asyncHandler from 'express-async-handler';
import Favourite from './favouriteModel';

const router = express.Router();

// GET favourites for logged-in user
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const favourites = await Favourite.find({ userId: req.user._id });
    res.status(200).json(favourites);
  })
);

// ADD a favourite
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const favourite = await Favourite.create({
      ...req.body,
      userId: req.user._id
    });
    res.status(201).json(favourite);
  })
);

// DELETE a favourite
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await Favourite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    res.status(204).end();
  })
);

export default router;
