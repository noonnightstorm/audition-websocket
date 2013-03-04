var db = require( './db' );
exports.connection = function(io){
	return function listenConnection (socket){
		socket.on("answer_single",function(data){
		    db.saveSingleReplication(data);
		    io.sockets.emit("answer_single_admin" , { 
		      person_id : data.person_id,
		      answer_id : data.answer_id
		    });
		  });
		  socket.on("answer_double",function(data){
		    db.saveDoubleReplication(data);
		    io.sockets.emit("answer_double_admin" , {
		      person_id : data.person_id,
		      answer_id : data.answer_id,
		      mark : data.mark
		    });
		  });
		  socket.on("answer_text",function(data){
		    db.saveTextReplication(data);
		    io.sockets.emit("answer_text_admin" , { 
		      person_id : data.person_id,
		      question_id : data.question_id,
		      content : data.content
		    });
		  });
	}
}