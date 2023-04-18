const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const secretKey = "abcdefghijklmnopqrstuvwxyzabcdef";


const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email address")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
})

// code for hashing user password

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 4);
    }
    next();

})

// code for genrating auth token 

userSchema.methods.generateAuthtoken = async function(){
    try {
        const token_one = jwt.sign({_id:this._id}, secretKey);
        this.tokens = this.tokens.concat({token: token_one});
        await this.save();
        return token_one;
    } catch (error) {
        console.log(error);
    }
}


const register = new mongoose.model("amazon_users",userSchema)

module.exports = register;