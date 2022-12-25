const mongoose = require('mongoose');
const {isEmail} = require('validator');

// used to hash passwords
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        lowercase: true,
        validate : [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter password'],
        minLength: [6, 'Min length of password is 6']
    }
});

// Function to encrypt the pass before saving it into database
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

// Function to login a user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    // here this is User model
    if(user){
        // brcypt will automatically encrypt the password
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;