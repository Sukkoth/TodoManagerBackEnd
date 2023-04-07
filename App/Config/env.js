module.exports = {
    app_port: process.env.APP_PORT || 4500,
    app_mode: process.env.APP_MODE || 'dev',
    db_url: process.env.DB_URL || 'mongodb://localhost:27017/Todo',
};
