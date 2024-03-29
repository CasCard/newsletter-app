// jshint esversion: 6
const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
var myKey=config.MY_KEY;
var listID=config.LIST_ID;

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post('/',function(req,res){
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;
  var email=req.body.email;

var data = {
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
    }
  ]
};

var jsonData=JSON.stringify(data);

var options={
  url:"https://us4.api.mailchimp.com/3.0/lists/"+listID,
  method:"POST",
  headers:{
    "Authorization":myKey
  },
  body:jsonData
};

request(options,function(error,response,body){
  if(error){
    res.sendFile(__dirname+"/failure.html");
  }else{
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+'/failure.html');
    }

  }
});

});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT,function(){
  console.log("Server is running on part 5000");
});
