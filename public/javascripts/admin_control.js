var socket = io.connect('192.168.0.93');
$(document).ready(function(){
	$(".answer-text-btn").css("display","none");
	socket.on("answer_single_admin",Response.singleAnswer);
	socket.on("answer_double_admin",Response.doubleAnswer);
	socket.on("answer_text_admin",Response.textAnswer);
});

var Response = {
	singleAnswer : function(data){
		var inputs = $("input[type='radio']");
		var inputs_len = inputs.length;
		for(var i=0;i<inputs_len;i++){
			if($(inputs[i]).val() == data.answer_id){
				$(inputs[i]).attr("checked",true);
				break;
			}
		}
		console.log(data);
	},
	doubleAnswer : function(data){
		var inputs = $("input[type='checkbox']");
		var inputs_len = inputs.length;
		for(var i=0;i<inputs_len;i++)
		if($(inputs[i]).val() == data.answer_id){
			if(data.mark == true)
				$(inputs[i]).attr("checked",true);
			else
				$(inputs[i]).attr("checked",false);
			break;
		}
		console.log(data);
	},
	textAnswer : function(data){
		var btns = $(".answer-text-btn");
		var btns_len = btns.length;
		console.log($(btns[0]).val());
		console.log(data.question_id);
		for(var i=0;i<btns_len;i++)
		if($(btns[i]).val() == data.question_id){
			$(btns[i]).siblings("textarea").val(data.content);
			break;
		}
		console.log(data);
	}
};