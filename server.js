
const express = require("express");
const connectDatabase = require("./db/database");
const bookRoutes = require("./routes/booksRoute");
const app = express();
const PORT = 3040;
app.use(express.json());
app.use("/api/books", bookRoutes);
app.get("/", (req, res) => {
  res.send("Library book Management server is running");
});

connectDatabase().then(() => {
    app.listen(PORT, () => {
      console.log("Server is Running on port "+ PORT);
    });
  }).catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
