import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

try {
  await connection.query("CREATE DATABASE IF NOT EXISTS food_recipes");
  await connection.query("USE food_recipes");

  await connection.query(`CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  )`);

  await connection.query(`CREATE TABLE ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  )`);

  await connection.query(`CREATE TABLE steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    instruction VARCHAR(100) NOT NULL
  )`);

  await connection.query(`CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  )`);

  await connection.query(`CREATE TABLE recipe_ingredients (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
  )`);

  await connection.query(`CREATE TABLE recipe_steps (
    recipe_id INT NOT NULL,
    step_id INT NOT NULL,
    PRIMARY KEY (recipe_id, step_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (step_id) REFERENCES steps(id) ON DELETE CASCADE
  )`);

  await connection.query(`CREATE TABLE recipe_categories (
    recipe_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
  )`);

  const [tables] = await connection.query(`SHOW TABLES`);
  console.log("\n Food Recipes Table:");
  console.table(tables);
} catch (error) {
  console.log(error);
}

try {
  await connection.query(`drop database food_recipes`);
} catch (error) {
  console.log(error);
}

await connection.end();

// Diagram can be found in Diagram.drawio.svg

/* =-=-= EXERCISE =-=-=
1. Was your database already in 2NF / 3 NF?
  - Yes, it was.

2. What changes did you have to do to normalize your database?
  - Nothing
*/

/* =-=-= DISCUSSION =-=-=
1. If you want to add thousands of recipes to your database, what challenges do you foresee?
  - Since we've created joined tables with correct PK, FK setup, The only challenge I see is to write a good queries that adds the information into all the tables at once without conflicts

2. Try to write answers to these questions in text, provide queries and commands when necessary.
  - I would start by creating the main items such as the recipe, ingredients, steps, and categories and getting their IDs.
  - If any of the mentioned already exists get the corresponding ID and use it for the new entry in the joined tables.
*/
