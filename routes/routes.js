var db = require( './db' );
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {});
};
exports.paper = function(req, res){
	db.getPaper().find({},function(err,papers){
		res.render('admin_paper', {
			papers:papers
		});
	});
};
exports.createPaper = function(req, res){
  res.render('create_paper', {});
};
exports.modifyPaper = function(req, res){
	db.getQuestion().find({paper_id:req.params.paper_id},function(err,questions){
		db.getAnswer().find({paper_id:req.params.paper_id},function(err,answers){
			res.render('modify_paper', {
				paper_id:req.params.paper_id,
				questions:questions,
				answers:answers
			});
			/*console.log(answers);*/
		})
	});
};
exports.choosePaper = function(req,res){
	db.getPaper().find({},function(err,papers){
		res.render('choose_paper', {
			papers:papers
		});
	});
};
exports.examination = function(req,res){
	var person_id = db.savePerson(req.params.paper_id);
	db.initReplication(person_id,req.params.paper_id);
	db.getQuestion().find({paper_id:req.params.paper_id},function(err,questions){
		db.getAnswer().find({paper_id:req.params.paper_id},function(err,answers){
			res.render('examination', {
				person_id : person_id,
				paper_id:req.params.paper_id,
				questions:questions,
				answers:answers
			});
		})
	});
}
exports.exitExam = function(req,res){
	db.delPerson(req.params.person_id);
	res.redirect("/");
}
exports.admin = function(req, res){
	db.getPerson().find({},function(err,persons){
		res.render("admin",{
			persons : persons
		});
	});
};
exports.adminControl = function(req,res){
	db.getQuestion().find({paper_id:req.params.paper_id},function(err,questions){
		db.getReplication().find({paper_id:req.params.paper_id},function(err,replications){
			res.render('admin_control', {
				paper_id:req.params.paper_id,
				questions:questions,
				replications:replications
			});
		})
	});
}