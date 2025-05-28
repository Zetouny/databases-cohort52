import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

try {
  await connection.query("USE w2_assignment");

  // Challenge 1 - All research papers and the number of authors that wrote that paper.
  const [researchPapers] = await connection.query(`
    SELECT rp.paper_title, COUNT(ap.author_id) AS "Number of Authors"
    FROM research_Papers AS rp
    LEFT JOIN authorPapers AS ap ON rp.paper_id = ap.paper_id
    GROUP BY rp.paper_id
  `);

  console.log("\n 1. Research Papers:");
  console.table(researchPapers);

  // Challenge 2 - Sum of the research papers published by all female authors.
  const [researchPapersByFemales] = await connection.query(`
    SELECT COUNT(DISTINCT ap.paper_id) AS Count
    FROM authors AS a
    JOIN authorPapers AS ap ON a.author_id = ap.author_id
    WHERE a.gender = 'Female';
  `);

  console.log("\n 2. Research Papers By Females:");
  console.table(researchPapersByFemales);

  // Challenge 3 - Average of the h-index of all authors per university.
  const [hIndexAvg] = await connection.query(`
    SELECT university, AVG(h_index)
    FROM authors
    GROUP BY university
  `);

  console.log("\n 3. h-index Average:");
  console.table(hIndexAvg);

  // Challenge 4 - Sum of the research papers of the authors per university.
  const [SumResearchPerUniversity] = await connection.query(`
    SELECT a.university, COUNT(DISTINCT ap.paper_id)
    FROM authors AS a
    JOIN authorPapers AS ap ON a.author_id = ap.author_id
    GROUP BY a.university
  `);

  console.log("\n 4. Sum Research Per University:");
  console.table(SumResearchPerUniversity);

  // Challenge 5 - Minimum and maximum of the h-index of all authors per university.
  const [minMaxHIndex] = await connection.query(`
    SELECT university, MIN(h_index), MAX(h_index)
    FROM authors
    GROUP BY university
  `);

  console.log("\n 5. Min & Max h-index:");
  console.table(minMaxHIndex);
} catch (error) {
  console.log(error);
}

await connection.end();
