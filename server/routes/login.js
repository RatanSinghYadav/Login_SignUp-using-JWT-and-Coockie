const register = require('../model/userScema');
const bcrypt = require('bcryptjs')
const secretKey = "abcdefghijklmnopqrstuvwxyzabcdef";
const jwt = require("jsonwebtoken");
require('cookie');
require('cookies');


const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    }

    try {

        const userlogin = await register.findOne({ email });

        if (!userlogin) {
            return res.status(401).json({ message: "auth failed" });
        }

        const match = await bcrypt.compare(String(password), String(userlogin.password))

        console.log(match);

        if (!match) {
            res.status(401).json({ error: "login password not match" })
        }
        
        // Genrate JWT Token

        const authToken = await userlogin.generateAuthtoken();
        console.log(authToken);  

        //  Create cookies

        res.cookie("JWT",authToken,{httpOnly: true});


        const token =  jwt.sign({ id: userlogin._id }, secretKey);
        console.log(token)
        console.log(userlogin);

        res.cookie("amazonUser",token);
        
        res.status(201).json(userlogin);
    } catch (error) {
        console.log(error)
    }
}

module.exports = Login;



