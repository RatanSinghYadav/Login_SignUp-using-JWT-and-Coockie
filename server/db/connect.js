const mongoose = require('mongoose');

const url = 'mongodb+srv://ratan:1234@cluster0.bzx2ll5.mongodb.net/Amazonweb?retryWrites=true&w=majority'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB database!")
}).catch((error) => {
    console.log(error);
})
