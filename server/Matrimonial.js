const mongoose = require('mongoose');

const MatrimonialSchema = new mongoose.Schema({
    name:String,
    gender:String,
    caste:String,
    email:String,
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{ collection: 'MatrimonialUsers' })

mongoose.model("MatrimonialUsers",MatrimonialSchema);