const express = require("express");
("use strict");
const router = express.Router();
const nodemailer = require("nodemailer");
const async = require("async");

/* GET home page. */
router.get("/", (req, res, next) => {
    res.render("index");
});

router.post("/contact", async (req, res) => {
    try {
        const output = `
        <p>You have new contact request</p>
        <h3>Contact details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.contact_email}</li>
        </ul>
        <h3>Message here</h3>
        <p>${req.body.message}</p>
        `;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.GMAIL, // generated ethereal user
                pass: process.env.GMAILPW, // generated ethereal password
            },
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Edification Online" <email here>', // sender address
            to: process.env.GMAILTWO, // list of receivers
            subject: "Contact", // Subject line
            text: "Hello world?", // plain text body
            html: output, // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
});

// mailing list get it done
// About US
router.get("/about-us", async (req, res) => {
    try {
        res.render("about.ejs");
    } catch (e) {
        console.log(e);
        res.redirect("back");
    }
});

module.exports = router;
