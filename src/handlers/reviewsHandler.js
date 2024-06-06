import {
  createReview,
  getReviews,
  getReviewById,
} from "../controllers/reviewsController.js";

import {
  validateOnlyLetters,
  validateMissingInformation,
  validateOnlyNumbers,
  validateMinMax,
} from "../utils/Validate/validateReviews/validateReviews.js";

export const createReviewHandler = async (req, res) => {
  const { comment, score, user_id } = req.body;
  try {
    validateMissingInformation({ comment, score, user_id });
    validateOnlyLetters(comment, "comment");
    validateOnlyNumbers(score, "score");
    validateMinMax(score, "score");

    await createReview(comment, score, user_id);

    res.sendStatus(201);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
export const getReviewsHandler = async (req, res) => {
  const { comment, score, orderBy, orderDirection } = req.query;

  const reviews = await getReviews(comment, score, orderBy, orderDirection);

  res.status(200).json(reviews);
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getReviewByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);
    if (!review) throw new Error("Review not found");
    res.status(200).send(review);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
