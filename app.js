const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user.js');

const app = express();

// This app.js file
app.use(bodyParser.json());

main().then(()=>{
    console.log("connections completed")
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/newUser')
}

app.post('/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log(username, email, password)
      
        if (!username || !email || !password) {
            return res.status(400).send('All fields are required');
        }
       
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
