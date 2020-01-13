const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const express = require("express");
const bodyParse = require("body-parser");
const expressLayout = require("express-ejs-layouts");
const Email = require("./models/emailModel");
const emailRoutes = require("./routes/emailRoute");
const catchAsync = require("./utils/catchAsync");

const app = express();

// view engine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body parser, reading data from body into req.body
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// if you running this application first time run below mentioned code to
// import data into database

// const emaillist = JSON.parse(
//   fs.readFileSync(path.join(__dirname, 'data/email.json'), 'utf-8')
// );
// console.log(emaillist)
// const importData = async () => {
//   try {
//     await Email.create(emaillist);
//     console.log('Data is imported to database please check it');
//   } catch (err) {
//     console.log('err', err);
//   }
// };
// importData();

app.get("/api", async (req, res, next) => {
  const emails = await Email.find({});

  res.status(200).json({
    status: "success",
    results: emails.length,
    data: {
      emails
    }
  });
});

// post request need to,from,subject,message, and type
app.post(
  "/api",
  catchAsync(async (req, res, next) => {
    const email = await Email.create({
      to: req.body.to,
      from: req.body.from,
      subject: req.body.subject,
      message: req.body.message,
      type: req.body.type
    });

    // console.log(email);
    res.status(201).json({
      status: "success",
      data: {
        email
      }
    });
  })
);

app.use("/", emailRoutes);

module.exports = app;
