
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes')
  , db = require('./routes/db')
  , sio = require('socket.io')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/*routes*/
app.get('/', routes.index);
app.get('/admin_paper', routes.paper);
app.get('/create_paper', routes.createPaper);
app.get('/modify_paper/:paper_id', routes.modifyPaper);
app.get('/choose_paper',routes.choosePaper);
app.get('/examination/:paper_id', routes.examination);
app.get('/exit_exam/:person_id',routes.exitExam);
app.get('/admin', routes.admin);
app.get('/admin_control/:paper_id',routes.adminControl);

/*db*/
app.post("/save_paper",db.savePaper);
app.put("/save_question/:paper_id",db.saveQuestion);

var server = http.createServer(app);

/*socket.io*/
var io = sio.listen(server);
io.sockets.on("connection",function(socket){
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
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});