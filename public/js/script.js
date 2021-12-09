const socket = io();

var ul = document.getElementById("logs");


socket.on("qr", (imgURI) => {
    if (imgURI) {

        document.querySelector('.qr img').setAttribute('src', imgURI);
        var li = document.createElement("li");
        li.appendChild(document.createTextNode('[ ❗ ] QR Code received, scan please! \n\n'));
        ul.appendChild(li);

        console.log('QR Code : ', imgURI);
        

    } else {
        document.querySelector('.qr img').setAttribute('src', './../assets/qr.png');
    }
    
});
socket.on("open", (open) => {

    var li = document.createElement("li");
    li.appendChild(document.createTextNode("[  ✔  ] " + open));
    ul.appendChild(li);

    document.querySelector('.qr img').setAttribute('src', './../assets/qr.png');
});

socket.on("connected", (connecting) => {

    var li = document.createElement("li");
    li.appendChild(document.createTextNode("[  ✔  ] " + connecting));
    ul.appendChild(li);

    document.querySelector('.qr img').setAttribute('src', './../assets/qr.png');
});


socket.on("messages", (messages) => {

    var li = document.createElement("li");
    li.appendChild(document.createTextNode("[ ❗ ] " + messages));
    ul.appendChild(li);

});

socket.on("credentials-updated", (credentials) => {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("[ ❗ ] " + credentials));
    ul.appendChild(li);


});

socket.on("close", (close) => {

    var li = document.createElement("li");
    li.appendChild(document.createTextNode("[❌] " + close));
    ul.appendChild(li);

    document.querySelector('.qr img').setAttribute('src', './../assets/qr.png');
});