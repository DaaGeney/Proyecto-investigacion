const dotenv = require("dotenv");
const nodemailer = require('nodemailer');
dotenv.config()

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const mailDetails = (email, token) => {
    let info = {
        from: 'notifications@udem.edu.co',
        to: email,
        subject: 'Password recovery',
        text: `Reset your password here: http://gamification-methodological.herokuapp.com/restorePassword?token=${token}&user=${email}`
    }
    mailTransporter.sendMail(info)
};

module.exports = { mailDetails }


