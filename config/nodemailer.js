const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const { getMaxListeners } = require("process");
const env = require('./environment');


let transport = nodemailer.createTransport(env.smtp);
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