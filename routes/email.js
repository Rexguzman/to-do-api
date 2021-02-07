const express = require('express');
const email = require('../utils/email/email')
const {confirm} = require('../utils/email/emailTemplate')

const EmailService = require('../services/email');

function emailApi(app) {
    const router = express.Router();
    app.use('/email/verify', router)

    const emailService = new EmailService();

    router.get('/:userId', async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await emailService.getUserVerifiedEmail({
                userId
            })
            if (user == null){
                res.status(401).json({
                    message: 'user does not exist'
                })
            }else if(!user.verifiedEmail){
                email(user.email, confirm(userId))
                res.status(200).json({
                    messege: "email send"
                })
            }else {
                res.status(200).json({
                    data: {
                        verifiedEmail: user.verifiedEmail},
                    message: 'verified email'
                })
            }

        }catch(err){
            next(err);
        }
    })

    router.get('/confirm/:userId', async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await emailService.getUserVerifiedEmail({
                userId
            })
            if(!user.verifiedEmail){
                const data = {
                    verifiedEmail: true,
                }
                const verifyEmail = await emailService.updateUserVerifiedEmail(userId, data)
                res.status(200).json({
                    verifyEmail,
                    message: 'email verified successfully'
                })
            }else if(user.verifiedEmail){
                res.status(400).json({
                    message: 'email already verified'
                })
            }

        }catch(err) {
            next(err);
        }
    })
}

module.exports = emailApi;