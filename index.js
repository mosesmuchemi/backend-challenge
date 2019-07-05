const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const passportJWT = require('passport-jwt');
const Sequelize = require('sequelize');

// initialze an instance of Sequelize
const conn = new Sequelize({
  database: 'mawingun_mpesa',
  username: 'root',
  password: '',
  dialect: 'mysql',
  define: {
    timestamps: false // true by default. false because bydefault sequelize adds createdAt, modifiedAt columns with timestamps.if you want those columns make ths true.
}
});

// check the databse connection
conn
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

//personnel and task models
const Personnel= conn.import("./models/personnel.js");
const Tasks= conn.import("./models/task.js");

console.log("wazi..things are looking good hapa.. ");

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let personnel = getPersonnel({ personnel_id: jwt_payload.personnel_id });

  if (personnel) {
    next(null, personnel);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

const app = express();
// initialize passport with express
app.use(passport.initialize());

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



//return evry personnel
const getAllPersonnel = async () => {
  return await Personnel.findAll();
};

//get a single personnel
const getPersonnel = async obj => {
  return await Personnel.findOne({
    where: obj,
  });
};

//get all tasks
const getAllTasks = async () => {
  return await Tasks.findAll();
};

//get a single task
const getTask = async obj => {
  return await Tasks.findOne({
    where: obj,
  });
};



//set some basic taks routes
// get all personnel
app.get('/tasks', function(req, res) {
  getAllTasks().then(task => res.json(task));
});

// set some basic personnel routes
app.get('/', function(req, res) {
  res.json({ message: 'Express is up!' });
});

// get all personnel
app.get('/personnel', function(req, res) {
  getAllPersonnel().then(personnel => res.json(personnel));
});

//register: storing phone, name, email and default password and redirecting to home page after signup
app.post('/personnel/create', function(req, res) {
  bcrypt.hash(req.body.personnel_password, saltRounds, function(err, hash) {
      Personnel.create({
          personnel_onames: req.body.personnel_onames,
          personnel_fname: req.body.personnel_fname,
          personnel_phone: req.body.personnel_phone,
          personnel_password: hash
      }).then(function(data) {
          if (data) {
              res.redirect('/');
          }
      });
  });
});

//login route
app.post('/personnel/login', function(req, res) {
  Personnel.findOne({
      where: {
          personnel_phone: req.body.personnel_phone
      }
  }).then(function(personnel) {
      if (!personnel) {
          res.redirect('/');
      } else {
          bcrypt.compare(req.body.personnel_password, personnel.personnel_password, function(err, result) {
            if (result == true) {
               // from now on we'll identify the personnel by the id and the id is the       
              // only personalized value that goes into our token
              let payload = { personnel_id: personnel.personnel_id };
              let token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({ 
                reset_password: personnel.reset_password, 
                accessToken: token,
                expires_in: '24h'
                });
            } else {
              res.status(401).json({ error: 'You have entered an incorrect password' });
            }
        });
      }
  });
});

// protected route
app.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json('Success! You can now see this without a token.');
});

// start app
app.listen(3000, function() {
  console.log('Express is running on port 3000');
});