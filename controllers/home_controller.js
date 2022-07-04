module.exports.home = function(req, res) {
    //return res.end('<h1> Express is up for Hello there! </h1>');

    console.log(req.cookies);
    //rendering the home ejs 
    return res.render('home', {
        title: "Home"
    });

}