const Login = require('./login');
const Register = require('./signup')
const {Router} = require('express');
const route = Router();


route.post('/signup',Register);
route.post('/login',Login);

module.exports = route;