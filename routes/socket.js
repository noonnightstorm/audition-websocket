exports.connection = function(socket){
	socket.on("answer_single",function(data){
		console.log("answer_single" + "========================");
		console.log(data);
		socket.emit("answer_single_admin" , { data : data});
	});
	socket.on("answer_double",function(data){
		console.log("answer_double" + "========================");
		console.log(data);
		socket.emit("answer_double_admin" , { data : data});
	});
	socket.on("answer_text",function(data){
		console.log("answer_text" + "========================");
		console.log(data);
		socket.emit("answer_text_admin" , { data : data});
	});
}