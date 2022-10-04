const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string', // type of schema
    base: joi.string(), // base schema to extend from.
    messages: { // hash of error codes and their messages
        'string.escapeHtml': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHtml: {
            validate(dirty, helpers) {
                // does not allow any html tags or attributes
                const clean = sanitizeHtml(dirty, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== dirty) {
                    return helpers.error('string.escapeHtml', { dirty });
                }
                return clean;
            }
        }
    }

})

const Joi = BaseJoi.extend(extension);

//validate user data in campground
//like title should be string and is required
//price should be number, minimum price can be zero and it is required
const joiCamp = Joi.object({
    name: Joi.string().required().escapeHtml(),
    price: Joi.number().required().min(0),
    // image: Joi.string().required(),
    location: Joi.string().required().escapeHtml(),
    description: Joi.string().required().escapeHtml(),
    deleteImages: Joi.array()
});

//validate data in reviews
const joiReview = Joi.object({
    review: Joi.object({
        body: Joi.string().required().escapeHtml(),
        rating: Joi.number().required().min(1).max(5)
    }).required()
})

module.exports.joiCamp = joiCamp;
module.exports.joiReview = joiReview;