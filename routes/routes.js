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
			console.log(answers);
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
	db.getQuestion().find({paper_id:req.params.paper_id},function(err,questions){
		db.getAnswer().find({paper_id:req.params.paper_id},function(err,answers){
			res.render('examination', {
				paper_id:req.params.paper_id,
				questions:questions,
				answers:answers
			});
		})
	});
}
exports.admin = function(req, res){
  res.render('admin', {});
};