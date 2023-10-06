const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connecion } = require("./Config/db");
const notesRouter = require("./route/notes.route");
const userRouter = require("./route/user.route");

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', userRouter);


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(process.env.port, async () => {
  try {
    await connecion;
    console.log("connected to DB");
  } catch (err) {
    console.log("server error");
  }
  console.log(`server is running at port ${process.env.port}`);
});
