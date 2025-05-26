import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

try {
  await connection.query("CREATE DATABASE IF NOT EXISTS w2_assignment");
  await connection.query("USE w2_assignment");
  await connection.query(
    "DROP TABLE IF EXISTS authors, research_Papers, authorPapers"
  );

  // Step 1 - Create authors table
  await connection.query(`CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100),
    university VARCHAR(100),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('Male', 'Female')
  )`);

  // Step 2 - add mentors column and add a foreign key references author_id
  await connection.query(`ALTER TABLE authors
    ADD COLUMN mentor INT,
    ADD FOREIGN KEY (mentor) REFERENCES authors(author_id)
  `);

  const [authors] = await connection.query(`DESCRIBE authors`);
  console.log("\n Authors Table:");
  console.table(authors);
} catch (error) {
  console.log(error);
}

await connection.end();
