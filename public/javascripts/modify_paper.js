$(document).ready(function(){
	$(".add-answer-btn").click(AnswerObj.addAnswer);
	$(".add-question-btn").click(QuestionObj.addQuestion);
	$(".save-question-btn").click(QuestionObj.saveQuestion);
	$(".del-question-btn").click(QuestionObj.delQuestion);
	$(".question-type").blur(selectBlur);
});

var AnswerObj = {
	count:0,
	addAnswer : function(e){
		e.preventDefault();
		var btn = e.target;
		var parent = $(btn).parents(".answer-box");
		var nodes = $(".answer-item-example").clone(true);
		var node = nodes[0];
		var input = $(node).children("input");
		$(input).attr("id","answer-input"+AnswerObj.count);
		$(node).removeClass("answer-item-example").css("display","block").appendTo(parent);
		AnswerObj.count++;
	}
};
var QuestionObj = {
	count:0,
	addQuestion : function(e){
		e.preventDefault();
		AnswerObj.count = 0;
		var node = $(".question-form-example").clone(true);
		$(node).removeClass("question-form-example").appendTo("body").css("display","block");
		var question_num = $(node).children("#question-num").val();
		QuestionObj.count++;
	},
	saveQuestion : function(e){
		e.preventDefault();
		var answer_nodes = $(e.target).siblings(".answer-box").children(".answer-item").children(".answer-content");
		var answers = [];
		for(var i=1;i<answer_nodes.length;i++){
			answers.push($(answer_nodes[i]).val());
		}
		var Question = {
			type : $(e.target).siblings(".question-type-box").children("#question-type").val(),
			content : $(e.target).siblings(".question-content-box").children("#question-content").val(),
			answers : answers
		};
		$(e.target).attr("disabled","disabled");
		$.ajax({
			url : "/save_question/"+e.target.value,
			type : "post",
			data : Question,
			datatype : "json",
			success : function (data){
			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				console.log(XMLHttpRequest + '#' + textStatus + '#' + errorThrown);
			}
		});
	},
	delQuestion : function (e){
		e.preventDefault();
		$.ajax({
			url : "/del_question/"+e.target.value,
			type : "get",
			datatype : "json",
			success : function (data){
			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				console.log(XMLHttpRequest + '#' + textStatus + '#' + errorThrown);
			}
		});
		$(e.target).parent(".question-form").remove();
	}
};

function selectBlur (){
	if($(this).val() == 2){
		$(this).parents(".question-form").find(".add-answer-btn").hide();
	}
	else{
		$(this).parents(".question-form").find(".add-answer-btn").show();
	}
}