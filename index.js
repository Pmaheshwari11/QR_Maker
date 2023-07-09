import express from "express";
import bodyParser from "body-parser";
const app = express();
import qr from "qr-image";
import fs from "fs";
import path from 'path';
const __dirname = path.resolve();

app.use(express.static("Assests"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
  res.render("index")
})

app.post("/", function (req, res) {
  var url = req.body.url
  var qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream('./Assests/qr-image.png'));
  res.render("result", { url: url })
})




app.listen(process.env.PORT || 3000, function (res, req) {
  console.log("Server started at port 3000")
})