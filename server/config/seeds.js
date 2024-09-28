const db = require("./connection");
const { User, Product, Category } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Category", "categories");
  await cleanDB("Product", "products");
  await cleanDB("User", "users");

  const categories = await Category.insertMany([
    { name: "Bread" },
    { name: "Pastery" },
    { name: "Prepaired Foods" },
  ]);

  console.log("categoires seeded");

  const products = await Product.insertMany([
    {
      name: "Country Sourdough",
      description: "House Sourdough",
      image: "sourdough.jpg",
      category: categories[0].id,
      price: 9.99,
      quantity: 20,
    },
    {
      name: "Old World Rye",
      description: "100% rye bread",
      image: "rye.jpg",
      category: categories[0].id,
      price: 12.99,
      quantity: 10,
    },
    {
      name: "Sesame Semolina",
      description: "Semolina Bread with Sesame Seed",
      image: "semolina.jpg",
      category: categories[0].id,
      price: 12.99,
      quantity: 10,
    },
    {
      name: "Sourdough Choclate Chip Cookie",
      description: "Choclate Chip Cookie with Sourdough and Sea Salt",
      image: "cookie.jpg",
      category: categories[1].id,
      price: 6.99,
      quantity: 30,
    },
    {
      name: "Cup Cake",
      description: "Seasonal Cupcake",
      image: "cupcake.jpg",
      category: categories[1].id,
      price: 6.99,
      quantity: 30,
    },
    {
      name: "Granola",
      description: "Grains and Oats with Honey, Nuts, and Dry Fruit",
      image: "granola.jpg",
      category: categories[2].id,
      price: 8.99,
      quantity: 30,
    },
  ]);

  console.log("products seeded");

  await User.create({
    email: "baker@baker.com",
    password: "bakerbaker",
    role: "admin",
  });

  await User.create({
    email: "lupin@cats.com",
    password: "meow",
    role: "customer",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[3]._id],
      },
    ],
  });

  console.log("users seeded");

  process.exit();
});
