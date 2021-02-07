const nodemailer = require('nodemailer');

const { config } = require('../../config');

const credentials = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.emailUser, 
      pass: config.emailPass,  
    }
}

const transporter = nodemailer.createTransport(credentials);

const verifyEmail = async (to, content) => {

    const contacts = {
        from: process.env.MAIL_USER,
        to
    }

    const email = Object.assign({}, content, contacts)

    await transporter.sendMail(email)
}

module.exports = verifyEmail;