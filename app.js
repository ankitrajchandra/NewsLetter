const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
// const request=require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

const port =3000;

app.use(express.static("public"));
// To apply CSS and all local files
// make a directory 'public' --> put all css/local files in it

// Display on port
app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
})


app.post("/", function(req,res){
    const fName=req.body.fName;
    const lName=req.body.lName;
    const email=req.body.email;

    // console.log(fName,lName,email);
    // res.write("<h1>Hello "+fName+" "+lName+"!</h1>");
    // res.write("<p>Your Email Id is "+email+".</p>");
    // res.send();

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us8.api.mailchimp.com/3.0/lists/b6aa68fd8e"

    const options={
        method:"POST",
        auth:"ankit:f0a695aae5a23558d99f986b5446d8b7-us8"
    }


    const request = https.request(url,options,function(response){

        if (response.statusCode===200) {
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }


        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    })

    // request.write(jsonData);
    request.end();

});


app.post("/failure",function(req,res){
    res.redirect("/");
});



// To run a port
app.listen(port,function(){
    console.log("Server is running on port "+port);
})


// API Key
// f0a695aae5a23558d99f986b5446d8b7-us8

// Audience ID
// b6aa68fd8e