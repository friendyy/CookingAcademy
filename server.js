const express = require("express");
const app = express();
// const products = require("./products.json"); // no longer used on homepage
const courses = require("./courses.json");
const features = require("./features.json");

// Set view engine
app.set("view engine", "pug");

// Serve static files from `public`
app.use(express.static(__dirname + "/public"));

// Homepage
app.get("/", (req, res) => {
  const whatsapp = "9179244249";
  const waNumber = whatsapp.replace(/\D/g, "");

  res.render("index", {
    title: "MasterChef-Style Cooking Academy",
    tagline: "100% vegetarian · Practice-Based · Cooking & Baking Courses: Beginner → Pro",
    // products removed from homepage
    courses: courses.courses,
    features: features.features,
    featuredCourses: courses.courses.slice(0, 4),
    whatsapp,
    waNumber,
    heroImage: "test4.png"
  });
});

// Start the server
const server = app.listen(process.env.PORT || 7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
