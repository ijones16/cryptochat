require('./modules/config');
process.on('message', function (msg) {
    if (msg.cmd && msg.cmd == 'stop') {
        console.log("Received STOP signal from master");
        app_process.close();
        process.exit();
    }
});