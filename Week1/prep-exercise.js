import mysql from "mysql2";

var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "food_recipes",
});

connection.connect();

const create_recipes = `create table recipes (
  id int,
  name varchar(100),
  ingredients text(100),
  steps varchar(100),
  cooking_time int,
  category varchar(100),
  )`;

const create_ingredients = `create table ingredients (
  id int,
  name varchar(100)
  )`;

const create_steps = `create table steps (
  id int,
  instructions varchar(100)
  )`;

const create_categories = `create table categories (
  id int,
  name varchar(100)
  )`;

// connection.query(create_recipes, function (error, results, fields) {
//   if (error) {
//     throw error;
//   }
//   console.log("the reply is ", results[0]);
// });
// connection.end();
