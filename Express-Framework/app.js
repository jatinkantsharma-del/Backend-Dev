const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
const PORT = 3000;

// --------------------
// MIDDLEWARE (FIRST)
// --------------------
app.use(express.urlencoded({ extended: true }));

// Logger middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
  });

  next();
});

// --------------------
// VIEW ENGINE
// --------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// --------------------
// ROUTES
// --------------------

// Home route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Users with query filter
const users = [
  { name: "Pranav" },
  { name: "Amit" },
  { name: "Riya" }
];

app.get("/users", (req, res) => {
  const { name } = req.query;

  const filteredUsers = name
    ? users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()))
    : users;

  res.json(filteredUsers);
});

// Contact form
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  res.send("Form submitted successfully!");
});

// Gallery
app.get("/gallery", (req, res) => {
  const images = ["photo1.jpg", "photo2.jpg"];
  res.render("gallery", { images });
});

// Blog
let posts = [
  { id: 1, title: "First Post", content: "Hello World!" }
];

app.get("/blog", (req, res) => {
  res.render("blog", { posts });
});

app.get("/blog/new", (req, res) => {
  res.render("new-post");
});

app.get("/blog/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("post", { post });
});

app.post("/blog", (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: posts.length + 1, title, content });
  res.redirect("/blog");
});

// --------------------
// 404 (ALWAYS LAST)
// --------------------
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// --------------------
// START SERVER
// --------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
