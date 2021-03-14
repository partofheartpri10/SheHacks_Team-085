const express=require("express");
const bodyParser= require("body-parser");
const https= require("https");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const app= express();
app.use(bodyParser.urlencoded({extended: true}));

var emails=[];
app.get("/",function(req,res){
  res.sendFile(__dirname+"/main.html");
});
app.get("/signin.html",function(req,res){
  res.sendFile(__dirname+"/signin.html");
});
app.get("/signup.html",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.get("/urgent.html",function(req,res){
  res.sendFile(__dirname+"/urgent.html");
});
app.get("/register.html",function(req,res){
  res.sendFile(__dirname+"/register.html");
});
app.get("/success.html",function(req,res){
  res.sendFile(__dirname+"/success.html");
});
app.get("/rights.html",function(req,res){
  res.sendFile(__dirname+"/rights.html");
});
app.get("/helpline.html",function(req,res){
  res.sendFile(__dirname+"/helpline.html");
});
app.get("/police.html",function(req,res){
  res.sendFile(__dirname+"/police.html");
});
app.use(express.static("public"));
app.post('/', function (req, res) {

var emailAdd= req.body.email;
console.log(emailAdd);
emails.push(emailAdd);
res.redirect("/register.html");
});




  function sendemail(){
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'nidhikamewar1506@gmail.com',
      pass: 'vsxazoxgrqtlqszx'
    },

        tls: {
            rejectUnauthorized: false
        }
  }));

  var maillist = emails;

  var msg = {
      from: "******", // sender address
      subject: "Emergency!!!", // Subject line
      text: "Need your help urgently,my current location is: अगुना Agunaa Mohalla, Rajasthan 341503, India", // plaintext body
      cc: "*******",
      to: maillist
  }



  transporter.sendMail(msg, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

app.get('/mail',function(req,res){
  sendemail();
  res.sendFile(__dirname + "/success.html");
})


app.listen(3000,function(){
  console.log("server is running at port 3000");
})
