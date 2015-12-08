/**
 * Created by Elias on 12/5/2015.
 */
var conversationController = require('../controllers/conversationController');

app.get('/conversations', function (req, res) {
    try {
        conversationController.getConversations(req.headers.uid, function (err, items) {
            if (err) {
                logger.badrequest('get: /conversations', {
                    time: new Date(),
                    body: req.body,
                    params: req.params,
                    ipaddress: req.connection.remoteAddress,
                    stacktrace: err.toString()
                });
                return res.status(500).send('Bad Request');
            }
            res.status(200).send(items);
        })
    } catch (e) {
        logger.error('get: /conversations', {
            time: new Date(),
            body: req.body,
            params: req.params,
            ipaddress: req.connection.remoteAddress,
            stacktrace: err.toString()
        });
        return res.status(500).send('Bad Request');
    }
});

app.get('/conversations/:id', function (req, res) {
    try {
        if (req.headers.check) {
            conversationController.newMessage(req.headers.cid, function (err, items) {
                if (err) {
                    logger.badrequest('get: /conversations/:id', {
                        time: new Date(),
                        body: req.body,
                        params: req.params,
                        ipaddress: req.connection.remoteAddress,
                        stacktrace: err.toString()
                    });
                    return res.status(500).send('Bad Request');
                }
                res.status(200).send(items);
            })
        }
        else {
            conversationController.getConversation(req.headers.cid, function (err, items) {
                if (err) {
                    logger.badrequest('get: /conversations/:id', {
                        time: new Date(),
                        body: req.body,
                        params: req.params,
                        ipaddress: req.connection.remoteAddress,
                        stacktrace: err.toString()
                    });
                    return res.status(500).send('Bad Request');
                }
                res.status(200).send(items);
            })
        }
    } catch (e) {
        logger.error('get: /conversations/:id', {
            time: new Date(),
            body: req.body,
            params: req.params,
            ipaddress: req.connection.remoteAddress,
            stacktrace: err.toString()
        });
        return res.status(500).send('Bad Request');
    }
});

app.post('/conversations', function (req, res) {
    try {
        conversationController.addConversation(req.body, function (err, items) {
            if (err) {
                logger.badrequest('get: /conversations', {
                    time: new Date(),
                    body: req.body,
                    params: req.params,
                    ipaddress: req.connection.remoteAddress,
                    stacktrace: err.toString()
                });
                return res.status(500).send('Bad Request');
            }
            res.status(200).send(items);
        })
    } catch (e) {
        logger.error('get: /conversations', {
            time: new Date(),
            body: req.body,
            params: req.params,
            ipaddress: req.connection.remoteAddress,
            stacktrace: err.toString()
        });
        return res.status(500).send('Bad Request');
    }
});

app.put('/conversations/:id', function (req, res) {
    try {
        conversationController.addMessageToConversation(req, function (err, items) {
            if (err) {
                logger.badrequest('get: /conversations', {
                    time: new Date(),
                    body: req.body,
                    params: req.params,
                    ipaddress: req.connection.remoteAddress,
                    stacktrace: err.toString()
                });
                return res.status(500).send('Bad Request');
            }
            res.status(200).send(items);
        })
    } catch (e) {
        logger.error('get: /conversations', {
            time: new Date(),
            body: req.body,
            params: req.params,
            ipaddress: req.connection.remoteAddress,
            stacktrace: err.toString()
        });
        return res.status(500).send('Bad Request');
    }
});
