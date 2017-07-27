var MongoRepository = require('./dal/MongoRepository');

module.exports = function (app) {
    
    app.get('/:user/mail', function (req, res) {
        MongoRepository.getMessage(req.params['user'], function (result) {
            res.json(result);
        });
    });

    app.post('/mail/status/update', function (req, res) {        
        MongoRepository.updateReadStatus(req.body._id, req.body.status);
        res.send(200);
    })    
}