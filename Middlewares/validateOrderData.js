const Joi = require("joi")

const validateOrderData = (req, res, next) => {
    const schema = Joi.object({
        products: Joi.array().items({
            productId: Joi.string().required(),
            quantity: Joi.number().min(0).positive().required(),
        }).required(),
    });

    const { error } = schema.validate(req.body.product);
    if (error) {
        error.status = 400;
        return next(error);
    }
    next();
};

module.exports = validateOrderData;
