import { Review, User } from "../database/db.js";

export const createReview = async (comment, score, user_id) => {
  const userId = await User.findByPk(user_id);

  if (!userId) throw Error(`User with ID: ${user_id} was not found`);

  const newReview = await Review.create({ comment, score, user_id });

  return newReview;
};

export const getReviews = async (comment, score, orderBy, orderDirection) => {
  let where = {};

  if (comment) where = { ...where, comment };
  if (score) where = { ...where, score };
  let order = [];
  if (orderBy && orderDirection) order = [[orderBy, orderDirection]];

  const reviews = await Review.findAll({
    where,
    order,
  });

  if (reviews.length === 0) throw Error("No reviews found");

  return reviews;
};

export const getReviewById = async (id) => {
  const review = await Review.findByPk(id);

  return review;
};
