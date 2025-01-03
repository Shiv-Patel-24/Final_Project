const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose")
const User = require('./models/user')

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


// MY code
app.get("/login/new", (req, res) =>{
    const {username, email, password} = req.body;
    console.log(`Username: ${username}, Password: ${password}, Email: ${email}`); // Debugging
    // if (!username || !password) {
    //   return res.status(400).send('Username and password are required');
    // }
    res.render("new.ejs")
});


app.post('/login', (req, res) => {
    const { password, email } = req.body;
    console.log(`This is login page : Password: ${password}, Email: ${email} `); // Debugging
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
    res.redirect('/login'); // Redirect after processing
});

// Route to create a new user
app.post("/login/new", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password }); // Create a new user
        await newUser.save(); // Save to the database
        console.log("New user created:", newUser);
        res.redirect('/login/dashboard');
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Error creating user");
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }); // Find user by email
        if (user && user.password === password) {
            console.log("User logged in:", user);
            res.redirect('/login/dashboard');
        } else {
            res.status(400).send("Invalid email or password");
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("Error during login");
    }
});

app.get('/login/dashboard', (req, res) =>{
    res.render("dashboard.ejs")
});

app.get('/login/dashboard/final',(req, res) =>{
    res.render("dashboardFinal.ejs")
})


app.listen(port, ()=>{
    console.log("listening port : 8080");
});