const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");



const app = express();


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
  res.sendFile ( __dirname + "/signup.html");
});


app.post("/",function(req,res){
  const firstName=req.body.fName;
  const lastName=req.body.lName;
  const email=req.body.email;

const data={

members:[
{
email_address:email,
status:"subscribed",
merge_fields:{
FNAME: firstName,
LNAME:lastName

}

}


]


};




const jsonData=JSON.stringify(data);
const url ="https://us7.api.mailchimp.com/3.0/lists/47508af5a6"

const options={
  method:"POST",
  auth:"izukumidoriya1million@gmail.com:4831032e2a04bfc75b21951db9e13fa6-us7"
}

const request =https.request(url,options,function(response){

  if (response.statusCode === 200){
    res.send("You're successfully subscribed !");
  }
  else{
    res.send("Please try again after sometime");
  }
  response.on("data",function(data){

    console.log(JSON.parse(data));
  });

});
 request.write(jsonData);
 request.end();


});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});


//API key
//d929d09da601bb9617660a626af0c64f-us7

//List
//47508af5a6
