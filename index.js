const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));   //for url
app.use(express.json());        //for JSON data

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

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
    const { username, password } = req.body;
    console.log(`Username: ${username}, Password: ${password}`); // Debugging
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
    res.redirect('/login'); // Redirect after processing
});


app.listen(port, ()=>{
    console.log("listening port : 8080");
});