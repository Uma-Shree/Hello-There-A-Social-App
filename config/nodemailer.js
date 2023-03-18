const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const { getMaxListeners } = require("process");


let transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmial.com',
    port: 587,
    secure: false,
    auth: {
        user: 'umashree31jan@gmail.com', //this should be user name
        pass: 'Pass@gmail11', //this should be password

    }
});
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template) {
            if (err) {
                console.log('error in rendering template');
                return;
            }


            mailHTML = template;
        }
    )


    return mailHTML;
}



module.exports = {
    transporter: this.transporter,
    renderTemplate: renderTemplate
}