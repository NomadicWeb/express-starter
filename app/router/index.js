module.exports = function (app) {
    app.use('/', require('./routes/index/index.js'));
};
