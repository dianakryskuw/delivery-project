var mailer = require("nodemailer");

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "great.delivery.service@gmail.com",
        pass: "Aa!12345"
    }
});

mailing = (userEmail) => {
var mail = {
    from: "Delivery Service <great.delivery.service@gmail.com>",
    to: userEmail,
    subject: "Order Information",
    html: "<b>Hello!</b> <p> Thank you for your order! Your order was sent and processing now.</p> <p> You can track it by link: <a href=\"http://localhost:8800/track\">TRACK NOW!</a></p>"
}

 smtpTransport.sendMail(mail, function(error, response) {
    if (error) {
        console.log(error);
    } else {
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close();
});
}
module.exports = {
    mailing
}