require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todosRoutes = require("./todos.routes");
const app = express();
const Client = require("pg").Client;
const client = new Client({
  user: process.env.AWS_USER,
  password: process.env.AWS_PASSWORD,
  host: process.env.AWS_HOST,
  port: process.env.AWS_PORT,
  database: process.env.AWS_DATABASE,
});

app.use(express.json());
app.use(cors());
app.use(todosRoutes);

app.get("/health", (req, res) => {
  return res.json("up");
});

client.connect().then((res) => console.log(res));

app.listen(3333, () => console.log("Server up in 3333"));
