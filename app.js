
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes')
  , db = require('./routes/db')
  , socket = require('./routes/socket')
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
app.post('/choose_paper',routes.choosePaper);
app.get('/examination/:paper_id/:person_id', routes.examination);
app.get('/exit_exam/:person_id',routes.exitExam);
app.get('/admin', routes.admin);
app.get('/admin_control/:person_id/:paper_id',routes.adminControl);

/*db*/
app.post("/save_paper",db.savePaper);
app.post("/save_question/:paper_id",db.saveQuestion);
app.get('/del_replication/:person_id',db.delReplication);
app.get('/del_question/:question_id',db.delQuestion);
app.get('/del_paper/:paper_id',db.delPaper);

var server = http.createServer(app);

/*socket.io*/
var io = sio.listen(server);
io.sockets.on("connection",socket.connection(io));

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});