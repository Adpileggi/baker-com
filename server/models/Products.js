const {Schema, model} = require('mongoose');

const productShcema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            min: 0,
         },
         description: {
            type: String,
        },
        image: {
            type: String,
        },
        // make category schema
        // category: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Category',
        //     required: true,
        // },
    },
    {
        toJSON: {
          virtuals: true,
        },
      }
)

const Product = model('Product', productShcema);

module.exports = Product