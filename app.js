//jshint esversion:6

const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const { dirname } = require('path')

const app = express()
const port = 3000
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    var fName = req.body.FirstName;
    var LName = req.body.LastName;
    var email = req.body.Email;
    var data = {
        members : [ 
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : fName,
                    LNAME : LName,

                }
        }
    ]
    }

    var jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/8f297d00a8"

    const options = {
        method: "POST",
        auth : "Hey:ed3dfb642f984b8a6214e1ef3c847630-us10"
    }


   const request = https.request(url, options, function(response){ 

        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(d){
            console.log(JSON.parse(d)); 
        })
    }) 
    request.write(jsonData);
    request.end()
    
})


app.post("/failure", function(request, response){
    response.redirect("/")
})




app.listen(port, function(){
    console.log("Server started on port 3000");
})



//API Key
// ed3dfb642f984b8a6214e1ef3c847630-us10


// List id
// 8f297d00a8