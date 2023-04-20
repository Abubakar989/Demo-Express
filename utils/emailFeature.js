const nodemailer = require('nodemailer');

exports.sendEmail = async (recipient, subject, message) => {
    try {
        // create transporter object
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        // create email object
        const mailOptions = {
            from: process.env.EMAIL,
            to: recipient,
            subject: subject,
            text: message
        };

        // send email
        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({
            status: 'success',
            message: 'Email sent successfully',
            info
        });

    } catch (err) {
        return err
    }
};
