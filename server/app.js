const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcryptjs');
const Username = 'Vikram_7_7'
const Password = 'm9cQlhNaEeDjQmg2';

require('./Matrimonial');
const User = mongoose.model("MatrimonialUsers");


const mongoUri = 'mongodb+srv://Vikram_7_7:m9cQlhNaEeDjQmg2@cluster0.7xb5m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// Connecting to database
mongoose.connection.on("connected", () => {
    console.log('Connected to database');
})

// Connection Error
mongoose.connection.on("error", (err) => {
    console.log("Error is : "+err);
})

app.post('/register', async (req, res) => {
    const { name, gender, caste, email, mobile, password: plainTextPassword } = req.body;
    const password = await bcrypt.hash(plainTextPassword, 10);
    try {
        const response = await User.create({
            name,
            gender,
            caste,
            email,
            mobile,
            password
        })
    } catch (error) {
        console.log(error);
        if(error.code === 11000) {
            // uses exists
            return res.json({ status: 'error', error: 'User exists' });
        }
        throw error
    }
    res.json({ status: 'ok' });
})

app.get('/', (req,res) => {
    res.send('Welcome to Node js');
})

app.listen(PORT, () => {
    console.log('Server Started on PORT '+PORT);
})