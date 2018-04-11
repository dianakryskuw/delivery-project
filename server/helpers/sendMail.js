var mailer = require("nodemailer");

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "great.delivery.service@gmail.com",
        pass: "Aa!12345"
    }
});

mailing = (userEmail, mailHTML) => {
var mail = {
    from: "Delivery Service <great.delivery.service@gmail.com>",
    to: userEmail,
    subject: "Order Information",
    html: mailHTML
}

 smtpTransport.sendMail(mail).then((response, error) => {
    if (!error) {
        console.log("Message sent to:  " + userEmail);
    }
    smtpTransport.close();
});
}
module.exports = mailing