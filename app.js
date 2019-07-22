

//jshint esversion:6
var axios = require('axios');



const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public"));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.get("/redirect-from-slack", function(req, res){
var code=req.query.code;
var x= code
console.log(x);
axios.get(`https://slack.com/api/oauth.access?client_id=648089766759.646269227808&client_secret=9c53f26148e9498e42945414930ba6d9&code=${code}`)
    .then(function (response) {
      console.log(response);
      var userId=response.data.user.id;
      var teamId=response.data.team.id;
      var accessToken=response.data.access_token;
      // display(accessToken);
      // res.cookie('access_token', accessToken)
      // res.sendFile(__dirname+"/index2.html");
      res.render('index2.ejs',{
        accessToken : accessToken
      });
      })
    .catch(function (error) {
      
      console.log(error);
      res.send('some error occured')
    })
  });






app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});


