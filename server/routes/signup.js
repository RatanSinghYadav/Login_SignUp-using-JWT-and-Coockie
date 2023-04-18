const register = require('../model/userScema');
const bcrypt = require('bcryptjs');

// create API data

async function Register(req, res) {
    const { fname, email, password } = req.body;

    if (!fname || !email || !password ) {
        res.status(422).json({ error: "filll the all details" });
        console.log("filll the all details");
    };

    try {

        const preuser = await register.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } else {

            const finaluser = new register({
                fname, email, password,
            });

            // yaha pe hasing krenge

            const storedata = await finaluser.save();
            console.log(storedata + "user successfully added");
            res.status(201).json(storedata);
        }

    } catch (error) {
        console.log("error found" + error.message);
        res.status(422).send(error);
    }

};

module.exports = Register;

