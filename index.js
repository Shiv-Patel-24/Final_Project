const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose")

app.use(express.urlencoded({ extended: true }));   //for url
app.use(express.json());        //for JSON data

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

// MONGODB CONNECTION 

main().then(()=>{
    console.log("Connection successful");
}).catch((err) =>{
    console.log("Error found", err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/user")
}

//  TILL THIS PART MONGODB CONNECTION


app.get("/login", (req, res) =>{            //This is GET request
    res.render("index.ejs");
});

app.get("/login/new", (req, res) =>{
    res.render("new.ejs")
});

// --------------  using another CODE ------------

// app.post("/login", (req, res) =>{
//     const {username, password} = req.body;
//     console.log(username, password);
//     // res.redirect("/login")
//     res.send("final username entered")
//     console.log(username, password)
// })
// ------------------------------------------------

app.post('/login', (req, res) => {
    const { username, password, email } = req.body;
    console.log(`Username: ${username}, Password: ${password}, Email: ${email}`); // Debugging
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
    res.redirect('/login'); // Redirect after processing
});

app.get('/login/dashboard', (req, res) =>{
    res.render("dashboard.ejs")
})


app.listen(port, ()=>{
    console.log("listening port : 8080");
});