const express = require('express');
const path = require('path');
const app = express();
require('./db/connect')
const route = require('./routes/router');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors())
app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(route);




// app.get('/',(req,res)=>{
//     res.render('home');
// })

// app.get('/signup',(req,res)=>{
//     res.render('signup');
// })


app.listen(8080,()=>[
    console.log("server is running...")
])