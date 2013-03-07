var socket = io.connect('http://localhost');
/*var socket = io.connect('192.168.0.93');*/
$(document).ready(function(){
	ExaminationListener.getPersonId();
	$("input[type='radio']").click(ExaminationListener.addSingleListener);
	$("input[type='checkbox']").click(ExaminationListener.addDoubleListener);
	$("textarea").blur(ExaminationListener.addAnswerListener);
	setInterval(ExaminationListener.intervalCommit,10000);
});

var ExaminationListener = {
	person_id : "",
	getPersonId : function(){
		var temp = window.location.href;
		var temps = temp.split("/");
		this.person_id = temps[temps.length-1];
	},
	addSingleListener : function(){
		var answer_id = $(this).val();
		socket.emit("answer_single",{
			person_id : ExaminationListener.person_id,
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
			person_id : ExaminationListener.person_id,
			answer_id : answer_id,
			mark : mark
		});
	},
	addAnswerListener : function(){
		var content = $(this).val();
		var question_id = $(this).siblings(".question-id-btn").val();
		socket.emit("answer_text",{
			person_id : ExaminationListener.person_id,
			question_id : question_id,
			content : content
		});
	},
	intervalCommit : function(){
		var textareas = $("textarea");
		var textareas_len = textareas.length;
		for(var i=0;i<textareas_len;i++){
			var content = $(textareas[i]).val();
			var question_id = $(textareas[i]).siblings(".question-id-btn").val();
			socket.emit("answer_text",{
				person_id : ExaminationListener.person_id,
				question_id : question_id,
				content : content
			});
		}
	}	
};
