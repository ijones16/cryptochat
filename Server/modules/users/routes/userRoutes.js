/**
 * Created by Elias on 12/5/2015.
 */
var userController = require('../controllers/userController');
app.get('/users', function (req, res) {
    try {
        userController.getUsers(req.body, function (err, items) {
            if (err) {
                logger.badrequest('get: /users', {
                    time: new Date(),
                    body: req.body,
                    params: req.params,
                    ipaddress: req.connection.remoteAddress,
                    stacktrace: err.toString()
                });
                return res.status(500).send('Bad Request');
            }
            //TODO:send usage
            res.status(200).send(items);
        })
    } catch (e) {
        logger.error('get: /users', {
            time: new Date(),
            body: req.body,
            params: req.params,
            ipaddress: req.connection.remoteAddress,
            stacktrace: e.toString()
        });
        return res.status(500).send('Bad Request');
    }
})
app.get('/users/:id', function (req, res) {
    try {
        userController.findUser(req.body, function (err, items) {
            console.log(req.body);
            if (err) {
                logger.badrequest('get: /users/:id', {
                    time: new Date(),
                    body: req.body,
                    params: req.params,
                    ipaddress: req.connection.remoteAddress,
                    stacktrace: err.toString()
                });
                return res.status(500).send('Bad Request');
            }
            //TODO:send usage
            res.status(200).send(items);
        })
    } catch (e) {
        logger.error('get: /users/:id', {
            time: new Date(),
            body: req.body,
            params: req.params,
            ipaddress: req.connection.remoteAddress,
            stacktrace: e.toString()
        });
        return res.status(500).send('Bad Request');
    }
})
app.post('/users/login/:id', function (req, res) {
    console.log(req.body);
    try {
        userController.login(req.body, function (err, items) {
            if (err) {
                logger.badrequest('get: /users/login/:id', {
                    time: new Date(),
                    body: req.body,
                    params: req.params,
                    ipaddress: req.connection.remoteAddress,
                    stacktrace: err.toString()
                });
                return res.status(500).send('Bad Request');
            }
            //TODO:send usage
            if (items) {
                res.status(200).send(items);
            }
            else{
                res.status(404).send('User not found')
            }
        })
    } catch (e) {
        logger.error('get: /users/login/:id', {
            time: new Date(),
            body: req.body,
            params: req.params,
            ipaddress: req.connection.remoteAddress,
            stacktrace: e.toString()
        });
        return res.status(500).send('Bad Request');
    }
})
app.post('/users/', function (req, res) {
    try {
        userController.addUser(req.body, function (err, items) {
            if (err) {
                logger.badrequest('get: /users/login/:id', {
                    time: new Date(),
                    body: req.body,
                    params: req.params,
                    ipaddress: req.connection.remoteAddress,
                    stacktrace: err.toString()
                });
                return res.status(500).send('Bad Request');
            }
            //TODO:send usage
            res.status(200).send(items);
        })
    } catch (e) {
        logger.error('get: /users/login/:id', {
            time: new Date(),
            body: req.body,
            params: req.params,
            ipaddress: req.connection.remoteAddress,
            stacktrace: e.toString()
        });
        return res.status(500).send('Bad Request');
    }
})