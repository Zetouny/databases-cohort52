import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect();

try {
  const [question_01] = await connection.query(
    `SELECT Name, Population FROM Country WHERE Population > 8000000`
  );
  console.log(
    "\n 1. What are the names of countries with population greater than 8 million?"
  );
  console.log(question_01);

  const [question_02] = await connection.query(
    `SELECT Name FROM Country WHERE Name LIKE '%land%'`
  );
  console.log(
    "\n 2. What are the names of countries that have “land” in their names?"
  );
  console.log(question_02);

  const [question_03] = await connection.query(
    `SELECT Name, Population FROM City WHERE Population BETWEEN 500000 AND 1000000`
  );
  console.log(
    "\n 3. What are the names of the cities with population in between 500,000 and 1 million?"
  );
  console.log(question_03);

  const [question_04] = await connection.query(
    `SELECT Name FROM Country WHERE Continent = 'Europe'`
  );
  console.log(
    "\n 4. What's the name of all the countries on the continent 'Europe'?"
  );
  console.log(question_04);

  const [question_05] = await connection.query(
    `SELECT Name, SurfaceArea FROM Country Order by SurfaceArea Desc`
  );
  console.log(
    "\n 5. List all the countries in the descending order of their surface areas."
  );
  console.log(question_05);

  const [question_06] = await connection.query(
    `SELECT Name FROM City WHERE CountryCode = 'NLD'`
  );
  console.log("\n 6. What are the names of all the cities in the Netherlands?");
  console.log(question_06);

  const [question_07] = await connection.query(
    `SELECT Population FROM City WHERE Name = 'Rotterdam'`
  );
  console.log("\n 7. What is the population of Rotterdam?");
  console.log(question_07);

  const [question_08] = await connection.query(
    `SELECT Name, SurfaceArea FROM Country Order by SurfaceArea Desc Limit 10`
  );
  console.log("\n 8. What's the top 10 countries by Surface Area?");
  console.log(question_08);

  const [question_09] = await connection.query(
    `SELECT Name, Population FROM Country Order by Population Desc Limit 10`
  );
  console.log("\n 9. What's the top 10 most populated cities?");
  console.log(question_09);

  const [question_10] = await connection.query(
    `SELECT SUM(Population) FROM Country`
  );
  console.log("\n 10. What is the population number of the world?");
  console.log(question_10);
} catch (error) {
  console.log(error);
}

connection.end();
