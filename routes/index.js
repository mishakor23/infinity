const express = require('express');
const router = express.Router();
const faker = require('Faker');

let maxArticleId = 1;

/**
 * @param {String} value  Request param
 * @returns {Boolean}
 */
function isParamValid(value) {
  value = Number(value);
  return !isNaN(parseFloat(value)) && isFinite(value) && value >= 0 && (~~value === value);
}

/**
 * @param {Object} params
 * @param {String} params.limit
 *
 * @returns {Boolean}
 */
function isAllParamsValid({limit}) {
  return isParamValid(limit);
}

/**
 * Generate articles for feed.
 *
 * @param {Number|String} [count=5]
 * @param {Number|String} [tagsCount=5]
 *
 * @returns {Object[]} Generated articles
 */
function generateArticles(count = 5, tagsCount = 5) {
  const result = [];

  for (let i = 0; i < count; i++) {
    const articleId = maxArticleId++;

    result.push({
      id: articleId,
      title: faker.Lorem.sentence(),
      description: faker.Lorem.paragraphs(4),
      uri: `/article/${articleId}`,
      tags: faker.Lorem.words(tagsCount)
    });
  }

  return result;
}

/**
 * Generate random number in specific range
 * @param {Number} min
 * @param {Number} max
 *
 * @returns {Number} Random value
 */
function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Try to generate error accordingly random number's value.
 * Can generate 400, 401, 403 and 500 errors.
 *
 * @params {Object} response  Express response object
 * @returns {Boolean}         True if error is occurred, false otherwise
 */
function tryToGenerateError(response) {
  const randomNumber = generateRandom(1, 20);

  let code;

  switch (randomNumber) {
    case 5:
      code = 400;
      break;
    case 6:
      code = 401;
      break;
    case 7:
      code = 403;
      break;
    case 8:
      code = 500;
      break;
    default:
      return false;
  }

  response.status(code).send();

  return true;
}

router.get('/articles', function(req, res, next) {
  const {limit} = req.query;

  if (!isAllParamsValid({limit})) {
    res
      .status(401)
      .json({
        status: 'error',
        error: {
          message: 'Bad request'
        }
      });
  }

  const isErrorOccurred = tryToGenerateError(res);

  if (isErrorOccurred) {
    return;
  }

  const tagsCount = generateRandom(1, 5);
  const articles = generateArticles(limit, tagsCount);

  res
    .status(200)
    .json(articles);
});

module.exports = router;
