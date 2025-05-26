import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

try {
  await connection.query("USE w2_assignment");

  // Challenge 1 - Print all authors and their corresponding mentors
  const [authors_mentors] = await connection.query(`
    SELECT a.author_name AS Author, m.author_name AS Mentor, a.mentor AS "Mentor ID"
    FROM authors AS a
    LEFT JOIN authors AS m ON a.mentor = m.author_id
  `);

  console.log("\n Authors with mentors:");
  console.table(authors_mentors);

  // Challenge 2 - Print all authors columns and their published paper_title
  const [authors_papers] = await connection.query(`
    SELECT a.*, rp.paper_title
    FROM authors AS a
    LEFT JOIN authorPapers AS ap ON a.author_id = ap.author_id
    LEFT JOIN research_Papers AS rp ON rp.paper_id = ap.paper_id
    ORDER BY a.author_id
  `);

  console.log("\n Authors and their research papers:");
  console.table(authors_papers);
} catch (error) {
  console.log(error);
}
await connection.end();
