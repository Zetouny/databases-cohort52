import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect();

try {
  await connection.query("CREATE DATABASE IF NOT EXISTS food_recipes");
  await connection.query("USE food_recipes");

  await connection.query(`CREATE TABLE recipes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    cooking_time INT
  )`);

  await connection.query(`CREATE TABLE ingredients (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
  )`);

  await connection.query(`CREATE TABLE steps (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  instructions VARCHAR(100)
  )`);

  await connection.query(`CREATE TABLE categories (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
  )`);

  const [invitee_rows] = await connection.query(`SHOW TABLES`);
  // console.log("\n Invitee Table:");
  console.table(invitee_rows);
} catch (error) {
  console.log(error);
}

try {
  const [results, fields] = await connection.query(
    `drop database food_recipes`
  );
} catch (error) {
  console.log(error);
}

connection.end();
