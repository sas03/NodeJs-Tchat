let history = [];

//socket petit tuyau relié entre le serveur et l'utilisateur où on passe les informations
module.exports = (io) => {
    //io ecoute quand un utilisateur se connecte et envoie le socket
    io.on('connection', (socket) => {
        console.log('+1');

        //<--new
        socket.emit('history', history);
        //new-->
        
        socket.on('newUser', data => console.log(data));

        socket.emit('welcome','Bonjour');
        socket.broadcast.emit('welcome','toto');
        /*setInterval(() => {   
            socket.emit('welcome','Bonjour');
        },2);*/
        socket.on('newMessage', data => {

            //<--new
            history.push(data);
            if(history.length > 10){
                history.shift();
            }
            //new-->

            socket.broadcast.emit('incomingMessage', data);
            socket.emit('incomingMessage', data);
        })
        
        socket.on('disconnect', () => {
            console.log('-1');
        });
    })
};