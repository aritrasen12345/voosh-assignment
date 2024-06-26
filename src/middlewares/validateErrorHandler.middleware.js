import { validationResult } from "express-validator";

/**
 * This is an error handling middleware
 * If there is any validation error this middleware handle that otherwise proceed normally
 */

const validateErrorHandler = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      /**
       * If there is nay error then throwing error along with details.
       */
      throw new Error(`Field validation failed!`, {
        cause: {
          indicator: "validation",
          status: 400,
          details: errors,
        },
      });
    }

    // * If there is no error
    next();
  } catch (err) {
    next(err);
  }
};

export default validateErrorHandler;
