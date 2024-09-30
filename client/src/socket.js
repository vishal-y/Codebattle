// import {io} from 'socket.io-client'

// export const initSocket = async()=>{
//     const options = {
//         'force new connection' : true ,
//         reconnectionAttempt : 'Infinity',
//         timeout : 10000,
//         transports : ['websocket'],
//     };
//     return io('http://localhost:5000/',options)
// }   

import { io } from 'socket.io-client';

let socket;

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    socket = io('http://localhost:5000/', options);
    return socket;
};

export const getSocket = () => {
    if (!socket) {
        throw new Error("Socket not initialized. Call initSocket first.");
    }
    return socket;
};

export const onEvent = (event, callback) => {
    if (socket) {
        socket.on(event, callback);
    }
};

export const offEvent = (event) => {
    if (socket) {
        socket.off(event);
    }
};

export const emitEvent = (event, data) => {
    if (socket) {
        socket.emit(event, data);
    }
};
