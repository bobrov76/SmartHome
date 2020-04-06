const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const app = express();
/////////////////////////////
/////////////////////////////

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.config")(passport);


// const whitelist = ['http://localhost:4200'];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin))
//       return callback(null, true)

//       callback(new Error('Not allowed by CORS'));
//   }
// };

// app.use(cors(corsOptions));
app.use(cors());
app.options('*', cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./model");

//db.sequelize.sync();
//drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
app.use(express.static(path.join(__dirname,"public")));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
//////////////////////////////////////////////





//////////////////////////////////////////////


require("./routes/users.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
var server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


var io = require('socket.io').listen(server);
io.on('connection',(socket)=>{

  console.log('new connection made.');


  socket.on('join', (data)=>{
    //joining
    socket.join(data.room);

    console.log(data.user + 'joined the room : ' + data.room);

    socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
  });


  socket.on('leave', (data)=>{
  
    console.log(data.user + 'left the room : ' + data.room);
    socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
    socket.leave(data.room);
  });

  socket.on('message',(data)=>{

    io.in(data.room).emit('new message', {user:data.user, message:data.message});
  })
});