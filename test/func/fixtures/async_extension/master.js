var proc = require('luster');

proc
    .configure({
        app: 'worker.js',
        workers: 1,
        control: {
            exitThreshold: 100,
        },
        extensions: {
            'luster-async': {
                param1: 2,
                param2: 'Hello'
            },
        }
    }, true, __dirname)
    .run();

if (proc.isMaster) {
    proc.once('running', function() {
        process.send('ready');
    });

    proc.once('initialized', function() {
        console.log('master is initialized');
    });
}
