var mailer = require("nodemailer");

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "great.delivery.service@gmail.com",
        pass: "Aa!12345"
    }
});

var mail = {
    from: "Delivery Service <great.delivery.service@gmail.com>",
    to: "diana.kryskuw@gmail.com",
    subject: "Order Information",
    html: "<b>Hello!</b> <p> Thank you for your order! Your order was sent and processing now.</p> <p> You can track it by link:</p>"
}

mailing = () => smtpTransport.sendMail(mail, function(error, response) {
    if (error) {
        console.log(error);
    } else {
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close();
});
module.exports = {
    mailing
}