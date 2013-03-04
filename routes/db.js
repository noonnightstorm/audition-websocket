var mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/examination' );
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Person = new Schema({
	name : String  ,
	paper_id : String 
});
var Paper = new Schema({
	name : String,
	type : String  ,
	question_num : Number ,
	limit_time : String,
	description : String
});
var Qusetion = new Schema({
	paper_id : String  ,
	type : Number ,
	content : String 
});
var Answer = new Schema({
	paper_id : String  ,
	question_id : String  ,
	content : String 
});
var Replication = new Schema({
	answer_id : String  ,
	person_id : String  ,
	paper_id : String  ,
	question_id : String  ,
	content : String  ,
	result : String
});

var Persons = mongoose.model( 'Persons', Person );
var Papers = mongoose.model( 'Papers', Paper );
var Questions = mongoose.model( 'Qusetions', Qusetion );
var Answers = mongoose.model( 'Answers', Answer );
var Replications = mongoose.model( 'Replications', Replication );

/*get*/
exports.getPerson = function(){
	return Persons;
}
exports.getPaper = function(){
	return Papers;
}
exports.getQuestion = function(){
	return Questions;
}
exports.getAnswer = function(){
	return Answers;
}
exports.getReplication = function(){
	return Replications;
}


/*save*/ 
exports.savePaper = function(req,res){
	var paper = new Papers();
	paper.name = req.body.name;
	paper.type = req.body.type;
	paper.question_num = 0;
	paper.limit_time = req.body.limit_time;
	paper.description = req.body.description;
	paper.save();
	Persons.remove({},function(err){});
	Papers.remove({},function(err){});
	Questions.remove({},function(err){});
	Answers.remove({},function(err){});
	res.redirect("/modify_paper/"+paper._id)
}

exports.saveQuestion = function(req,res){
	var question = new Questions();
	question.paper_id = req.params.paper_id;
	question.type = req.body.type;
	question.content = req.body.content;
	question.save();
	var answers = req.body.answers;
	for(var i=0;i<answers.length;i++){
		var answer = new Answers();
		answer.paper_id = req.params.paper_id;
		answer.question_id = question._id;
		answer.content = answers[i];
		answer.save();
	}
}
exports.savePerson = function(paper_id){
	var person = new Persons();
	person.name = "audition";
	person.paper_id = paper_id;
	person.save();
	return person._id;
}
exports.saveSingleReplication = function (data){
	Replications.update({answer_id:data.answer_id},{$set:{result:"true"}},function(err,obj){});
}
exports.saveDoubleReplication = function (data){
	Replications.update({answer_id:data.answer_id},{$set:{result:data.mark}},function(err,obj){});
}
exports.saveTextReplication = function (data){
	Replications.update({question_id:data.question_id},{$set:{result:data.content}},function(err,obj){});
}


/*delete*/
exports.delPerson = function(person_id){
	Persons.remove({_id:person_id},function(err){});
}
exports.delReplication = function(req,res){
	Persons.remove({_id:req.params.person_id},function(err){
		Replications.remove({person_id:req.params.person_id},function(err){
			if(!err)
			res.redirect("/");
		});
	});
}
exports.delQuestion = function(req,res){
	Questions.remove({_id:req.params.question_id},function(err){
		Answers.remove({question_id:req.params.question_id},function(err){});
	});
}

/*init db*/
exports.initReplication = function(person_id,paper_id){
	Answers.find({paper_id:paper_id},function(err,answers){
		answers.forEach(function(answer){
			var replication = new Replications();
			replication.answer_id = answer._id;
			replication.person_id = person_id;
			replication.paper_id = answer.paper_id;
			replication.question_id = answer.question_id;
			replication.content = answer.content;
			replication.result = "false";
			replication.save();
		});
	});
	Questions.find({paper_id:paper_id,type:2},function(err,questions){
		questions.forEach(function(question){
			var replication = new Replications();
			replication.answer_id = "null";
			replication.person_id = person_id;
			replication.paper_id = question.paper_id;
			replication.question_id = question._id;
			replication.content = "null";
			replication.result = "";
			replication.save();
		});
	});
}
