// 'use strict';

// const stripe = require("stripe")("sk_test_51OTSwrSG323pqoN93QIjSx6kzw91ANEAN58BdX25xhw6VPp4Aw9a8U1GRVRNhlzF8uvhpuKa7AdNmL6WQ7vS6NFS00N5QGGtR5");



// /**
//  * order controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::order.order', ({ strapi }) => ({
//     async create(ctx) {
//         const { products, userName, email } = ctx.request.body;

//         try {
//             // retrive item info
//             const lineItems = await Promise.all(
//                 products.map( async (product) => {
//                     const item = await strapi.service("api::item.item").findOne(product.id);

//                     return {
//                         price_data : {
//                             currency: "usd",
//                             product_data : {
//                                 name: item.name
//                             },
//                             unit_amount: item.price * 100
//                         },
//                         quantity: product.count,
//                     }
//                 })
//             );

//             // create stripe session
//             const session = await stripe.checkout.sessions.create({
//                 payment_method_types: ["card"],
//                 customer_email: email,
//                 mode: "payment",
//                 success_url: "http://localhost:3000/checkout/success",
//                 cancel_url: "http://localhost:3000",
//                 line_items: lineItems
//             });

//             // create the item
//             await strapi.service("api::order.order").create({
//                 data: { userName, products, stripeSessionId: session.id, }
//             });

//             //retur the session id
//             return { id: session.id }
//         } catch (error) {
//             ctx.response.status = 500;
//             return { error: { message: "There was a problem creating the charge.", } }
//         }
//     } 
// }));


"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userName, email } = ctx.request.body;
    try {
      // retrieve item information
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );

      // create a stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "http://localhost:3000/checkout/success",
        cancel_url: "http://localhost:3000",
        line_items: lineItems,
      });

      // create the item
      await strapi
        .service("api::order.order")
        .create({ data: { userName, products, stripeSessionId: session.id } });

      // return the session id
      return { id: session.id };
    } catch (error) {
      ctx.response.status = 500;
      return { error: { message: "There was a problem creating the charge" } };
    }
  },
}));