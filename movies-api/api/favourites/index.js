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
    console.log("REQ.USER:", req.user);
    console.log("REQ.BODY:", req.body);

    if (!req.user) {
      return res.status(401).json({ message: "No user on request" });
    }

    const favourite = await Favourite.create({
      movieId: req.body.movieId,
      title: req.body.title,
      userId: req.user._id,
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
