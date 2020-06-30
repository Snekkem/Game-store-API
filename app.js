const express = require("express");
const app = express();
let cors = require('cors');
const bodyParser = require('body-parser');

const multer = require('multer');

// let Client = require('ssh2-sftp-client');
// let sftp = new Client();

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
// определяем роутеры
const gamesRouter = require("./Routes/gamesRouter");
const userRouter = require("./Routes/userRouter");
const cartRouter = require("./Routes/cartRouter");
const wishRouter = require("./Routes/wishRouter");

app.use('/images', express.static('images'));
app.use("/games", gamesRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter)
app.use("/wishlist", wishRouter)

app.listen(8000, () => console.log(`Server started at: localhost:8000`));