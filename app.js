const express= require("express")
const app= express()
const bodyParser= require("body-parser");
const { urlencoded, json } = require("express");
const https= require("https");
const { url } = require("inspector");

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",(req,res)=>{
    const firstName= (req.body.Fname)
    const lastName = (req.body.Lname)
    const Email= (req.body.email)

    const data={
        members: [
            {
      email_address: Email,
      status: "subscribed",
      merge_fields:{
          FNAME: firstName,
          LNAME: lastName
          }
        }
     ]
    }

   const jsonDtata = JSON.stringify(data)
   console.log( JSON.stringify(data));

    const url= "https://us9.api.mailchimp.com/3.0/lists/1963732912";
    const options={
        method: "POST",
        auth: "demoivre02:2980e12d3087b4c69e7faf8a006a36ce-us9"
    }
   const request=  https.request(url, options, (response)=>{
    if (response.statusCode ===200) {
        res.sendFile(__dirname+"/success.html")
    }else{
        res.sendFile(__dirname+"/failure.html")
    }
        response.on("data",(data)=>{
            console.log(  JSON.parse(data) );
        })
 })

    request.write(jsonDtata)
    request.end()
});
app.post("/success",(req,res)=>{
    res.redirect("/")
})
app.post("/failure",(req,res)=>{
    res.redirect("/")
})
app.listen(process.env.PORT|| 8080)

