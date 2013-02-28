var socket = io.connect('http://localhost');
/*socket.on("text",function(data){
	console.log(data);
});*/
$(document).ready(function(){
	$("input[type='radio']").click(ExaminationListener.addSingleListener);
	$("input[type='checkbox']").click(ExaminationListener.addDoubleListener);
	$(".answer-text-btn").click(ExaminationListener.addAnswerListener);
});

var ExaminationListener = {
	addSingleListener : function(){
		var answer_id = $(this).val();
		socket.emit("answer_single",{
			answer_id : answer_id
		});
	},
	addDoubleListener : function(){
		var answer_id = $(this).val();
		var mark = true;
		if($(this).is(':checked'))
			mark = true;
		else
			mark = false;
		socket.emit("answer_double",{
			answer_id : answer_id,
			mark : mark
		});
	},
	addAnswerListener : function(){
		var question_id = $(this).val();
		var content = $(this).siblings("textarea").val();
		socket.emit("answer_text",{
			question_id : question_id,
			content : content
		});
	}
};
