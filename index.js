// const express = require('express');
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override');
// const exphbs = require('express-handlebars');
// const pg = require('pg');


// // Initialise postgres client
// const configs = {
//   user: 'chuazhengwin',
//   host: '127.0.0.1',
//   database: 'pokemons',
//   port: 5432
// };

// const client = new pg.Client(configs);

// /**
//  * ===================================
//  * Configurations and set up
//  * ===================================
//  */

// // Init express app
// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));


// // Set handlebars to be the default view engine
// app.engine('handlebars', exphbs.create().engine);
// app.set('view engine', 'handlebars');


// /**
//  * ===================================
//  * Routes
//  * ===================================
//  */
// app.get('/', (req, response) => {
//   let params = req.body;

//   const queryString = 'SELECT * FROM pokemon'
//   const values = [];

//   client.connect((err) => {
//     if (err) console.error('connection error:', err.stack);

//     client.query(queryString, values, (err, res) => {
//       if (err) {
//         console.error('query error:', err.stack);
//       } else {
//         // res.render('home', { pokemon: res.rows[0] });

//         console.log('query result:', res.rows[0].id);
//         response.render('home', { pokemon: res.rows });
//         // console.log(res);
//         // redirect to home page
//       }
//       console.log('ending');
//       client.end();
//     });

//   });
// // response.render('home', { pokemon: res.rows[0] });
// });
// // app.get('/', (req, res) => {
// //   // query database for all pokemon

// //   // respond with HTML page displaying all pokemon
// // });

// app.get('/new', (request, response) => {
//   // respond with HTML page with form to create new pokemon
//   response.render('new');
// });

// app.get('/foo', (req, response) => {
//     client.connect((err) => {
//       if (err) console.error('connection error:', err.stack);
//       console.log("hello");
//       response.send("bye");
//       // client.end();

//     });
// })

// app.post('/', (req, response) => {
//   let params = req.body;

//   const queryString = 'INSERT INTO pokemon(name, height) VALUES($1, $2)'
//   const values = [params.name, params.height];

//   client.connect((err) => {
//     if (err) console.error('connection error:', err.stack);

//     client.query(queryString, values, (err, res) => {
//       if (err) {
//         console.error('query error:', err.stack);
//       } else {
//         console.log('query result:', res);

//         // redirect to home page
//         // response.redirect('/');
//       }
//       console.log('en ding in post');
//       // client.end();
//     });
//   });
// });

// /**
//  * ===================================
//  * Listen to requests on port 3000
//  * ===================================
//  */
// app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const { Client } = require('pg');

// Initialise postgres client
const client = new Client({
  user: 'chuazhengwin',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
});

client.connect((err) => {
  if (err) console.error('connection error:', err.stack);
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs.create().engine);
app.set('view engine', 'handlebars');


/**
 * ===================================
 * Routes
 * ===================================
 */
app.get('/:id/edit', (req, response)=>{
  const queryString = 'SELECT * from pokemon WHERE id = $1'
  const values = [req.params.id];
  client.query(queryString, values, (err, res)=>{
    if (err){
      console.error('query error: ', err.stack);
    } else{
      response.render('edit', {pokemon: res.rows[0]})
    }
  });
});

// app.put('/:id', (req, response) =>{
//   const queryString = 'UPDATE students SET   WHERE name = ';
//   const values = 

// })



 app.get('/:id', (req, response) =>{
  const queryString = 'SELECT * from pokemon WHERE id = $1'
  const values =[req.params.id];
  client.query(queryString, values, (err, res)=>{
    if (err){
      console.error('query error: ', err.stack);
    } else{
      console.log(res.rows);
      response.render('pokemon', {pokemon: res.rows[0]});
    }
          // console.log(pokemon);

  });
 });

 app.get('/', (req, response) => {
  const queryString = 'SELECT * from pokemon'
  const values = [];
  client.query(queryString, values, (err, res) => {
    if (err) {
      console.error('query error:', err.stack);
    } else {

        console.log('query result:', res.rows[0].id);
        response.render('home', { pokemon: res.rows });
      }
    });
});

 app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});


 app.post('/', (req, response) => {
  let params = req.body;

  const queryString = 'INSERT INTO pokemon(name, height) VALUES($1, $2)'
  const values = [params.name, params.height];

  client.query(queryString, values, (err, res) => {
    if (err) {
      console.error('query error:', err.stack);
    } else {
      console.log('query result:', res);

      // redirect to home page
      response.redirect('/');
    }
  });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));