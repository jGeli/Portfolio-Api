import expressAsyncHandler from "express-async-handler";
import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'jaybee.aicpa@gmail.com',
        pass: 'kbdrfybkfcutfkel',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});


export const login = expressAsyncHandler(async (req, res, next ) => {

    
    res.json({ message: "Hello tol!"})
})


export const sendEmail = async (req, res) => {
console.log(req.body)
const {to, subject, text } = req.body;
const mailData = {
    from: 'jaybee.aicpa@gmail.com',
    to: 'jaybee.aicpa@gmail.com',
    subject: subject,
    text: text,
    html: `<b>Hey there! </b>
    <br> ${to} Sent an email.<br/>
    <br> ${text}<br/>`,
};

transporter.sendMail(mailData, (error, info) => {
    if (error) {
        return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
});

    // res.send('Email Sent')
}