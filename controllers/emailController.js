const Email = require("./../models/emailModel");
const catchAsync = require("./../utils/catchAsync");
var nodemailer = require("nodemailer");

exports.receive = catchAsync(async (req, res, next) => {
  const emails = await Email.find({ type: "receive" });
  res.render("email.ejs", {
    emails: emails
  });
});
exports.sent = catchAsync(async (req, res, next) => {
  const emails = await Email.find({ type: "sent" });
  // console.log(emails);

  res.render("email.ejs", {
    emails: emails
  });
});
exports.archive = catchAsync(async (req, res, next) => {
  const emails = await Email.find({ type: "archive" });
  // console.log(emails);

  res.render("email.ejs", {
    emails: emails
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const emails = await Email.find({ type: "delete" });
  // console.log(emails);

  res.render("email.ejs", {
    emails: emails
  });
});

exports.compose = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  await Email.create({
    to: req.body.to,
    from: req.body.from,
    subject: req.body.subject,
    message: req.body.message,
    type: "sent"
  });

  // var transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false,
  //   requireTLS: true,
  //   auth: {
  //     user: "YourEmail@gmail.com",
  //     pass: "password"
  //   }
  // });

  // var mailOptions = {
  //   from: "YourEmail@gmail.com",
  //   to: req.body.to,
  //   subject: req.body.subject,
  //   text: req.body.message
  // };

  // transporter.sendMail(mailOptions, function(error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
  
  res.redirect("/");
});

exports.actionById = catchAsync(async (req, res, next) => {
  const { type, actionId } = req.body;
  const email = await Email.findOne({ _id: actionId });
  console.log(email);

  if (type == "delete") {
    email.type = "delete";
  } else if (type == "archive") {
    email.type = "archive";
  }
  await email.save();

  // res.redirect("/");
  res.status(201).send({
    status: "success"
  });
});

exports.search = async (req, res, next) => {
  const text = req.query.searchEmail;
  console.log(text);

  const emails = await Email.find({ to: { $regex: text, $options: "i" } });
  // console.log("Below are the email");
  // console.log(emails);

  res.render("email.ejs", {
    emails: emails
  });
};

exports.entireEmail = async (req, res, next) => {
  const { id } = req.params;

  const email = await Email.find({ _id: id });

  res.render("entireEmail.ejs", {
    email: email
  });
};
