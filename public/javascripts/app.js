const socket = io();
const name = prompt('Nom ?');

//<--new to see 
socket.on('typingIncoming', data => document.querySelector('#typing').innerHTML = `${data.name} is typing (${data.message})`);
//new-->

socket.on('history', data => data.forEach(message => {
    //if à revoir
    if(message.name !== ''){
        document
        .querySelector('#messages')
        .innerHTML += `<li>${message.name} : ${message.message}</li>`
    }
}));

document
    .querySelector('.send')
    .addEventListener('click', ()  => {
        const message = document 
            .querySelector('#textMessage')
            .value;
        
        //socket.emit('typing', {
        //    message,
        //    name
        //});
            /*
            {
                message,
                name
            }
            --->
            {
                message:message,
                name:name
            }*/
            
            //document
            //    .querySlector('send')
            //    .addEventListener('click', () => {
            //        const message = document 
            //            .querySelector('#textMessage')
            //            .value;
            //    })


            socket.emit('newMessage', {
                message,
                name
            });

            document
                .querySelector('#textMessage')
                .value = '';
    
        });
    socket.on('incomingMessage', data => document
        .querySelector('#messages')
        .innerHTML += `<li>${data.name} : ${data.message}</li>`);
 