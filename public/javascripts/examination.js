var socket = io.connect('http://localhost');
socket.on("text",function(data){
	console.log(data);
});