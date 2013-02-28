var socket = io.connect('http://localhost');
$(document).ready(function(){
	socket.on("answer_single_admin",Response.singleAnswer);
	socket.on("answer_double_admin",Response.doubleAnswer);
	socket.on("answer_text_admin",Response.textAnswer);
});

var Response = {
	singleAnswer : function(data){
		var inputs = $("input[type='radio']");
		var inputs_len = inputs.length;
		/*console.log(data.answer_id);*/
		for(var i=0;i<inputs_len;i++){
			if($(inputs[i]).val() == data.answer_id){
				console.log("success");
				$(inputs[i]).attr("checked",true);
				break;
			}
		}
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
	},
	textAnswer : function(data){
		console.log(data);
	}
};