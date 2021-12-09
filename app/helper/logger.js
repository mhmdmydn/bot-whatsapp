const moment = require('moment')
const date = moment().format('L h:mm:ss')


exports.log = (socket, key, msg) => {

    switch (key) {
        case 'messages':
            socket.emit(key, `${date} ${msg}`)
            console.log(`[ ➕] ${date} ${msg}`);
            break;
        
        case 'open':
            socket.emit(key, `${date} ${msg}`)
            console.log(`[ ✔ ] ${date} ${msg}`);
            break;
        
        case 'qr' || 'credentials-updated':
            socket.emit(key, msg)
            console.log(`[ ❗ ] ${date} Please Scan Here...`);
            break;
        
        case 'connected':
            socket.emit(key, `${date} ${msg}`)
            console.log(`[ ✔ ] ${date} ${msg}`);
            break;
        
        case 'close':
            socket.emit(key, `${date} ${msg}`)
            console.log(`[ ❌ ] ${date} ${msg}`);
            break;
        
        default:
            break;
    }
}