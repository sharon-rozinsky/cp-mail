var nodemailer = require('nodemailer');

console.log('Creating Transport');

//smtp transport configuration
var smtpTransport = nodemailer.createTransport({
    host: "localhost",
    port: 25,
    tls: { rejectUnauthorized: false }
});

smtpTransport.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

//Message
var message = {
    from: "me@localhost.com",
    replyTo: "me@localhost.com",
    to: "him@localhost",
    subject: "hello",
    text: "abc"
};

console.log('Sending Mail');
// Send mail
smtpTransport.sendMail(message, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
    }
    console.log('Closing Transport');
    smtpTransport.close();
});
