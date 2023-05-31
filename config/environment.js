const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'hello_there_db',

    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'umashree31jan@gmail.com', //this should be user name
            pass: 'HarryHeart', //this should be password

        }
    },
    google_client_id: "515851840531-ol591gv0jgcu698n8otokj94ddbckpfm.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'hellothere',

}

const production = {
    name: 'production'

}
module.exports = development;