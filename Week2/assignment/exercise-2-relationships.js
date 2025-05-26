import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

try {
  await connection.query("USE w2_assignment");

  // Step 1 - create research_Papers table
  await connection.query(`CREATE TABLE research_Papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(100),
    conference VARCHAR(100),
    publish_date DATE
  )`);

  const [research_paper] = await connection.query(`DESCRIBE research_Papers`);
  console.log("\n research_Papers Table:");
  console.table(research_paper);

  // Step 2 - add a join table between authors and research_Papers
  await connection.query(`CREATE TABLE authorPapers (
    author_id INT,
    paper_id INT,
    PRIMARY KEY (author_id, paper_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
  )`);

  const [authorPapers] = await connection.query(`DESCRIBE authorPapers`);
  console.log("\n authorPapers Table:");
  console.table(authorPapers);

  /* 
    Step 3 - with the help of AI (without cheating) these are the generated data to be inserted in the tables

    - All 15 authors are mentors or mentees and have paper(s) or are intentionally left without one for testing.
    - All 30 papers have at least one author.
    - Every aggregate query will have meaningful values to return.
    - You can test joins, left joins, and grouping with confidence.
  */
  await connection.query(`INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES
    ('Alice Smith', 'MIT', '1980-03-12', 45, 'Female', NULL),
    ('Bob Johnson', 'Harvard', '1975-06-23', 50, 'Male', 1),
    ('Catherine Lee', 'Stanford', '1985-01-17', 38, 'Female', 1),
    ('Daniel Kim', 'Oxford', '1990-08-09', 30, 'Male', 2),
    ('Emma Brown', 'Cambridge', '1982-11-02', 42, 'Female', 3),
    ('Frank White', 'MIT', '1978-05-30', 60, 'Male', NULL),
    ('Grace Green', 'Harvard', '1983-04-12', 33, 'Female', 6),
    ('Henry Black', 'Stanford', '1987-09-21', 27, 'Male', 6),
    ('Isabella Clark', 'Oxford', '1992-02-28', 20, 'Female', 5),
    ('Jack Lewis', 'Cambridge', '1981-12-15', 48, 'Male', 1),
    ('Karen Hall', 'MIT', '1993-03-25', 25, 'Female', 2),
    ('Leo Walker', 'Harvard', '1986-10-06', 36, 'Male', 4),
    ('Mia Allen', 'Stanford', '1991-07-19', 29, 'Female', 7),
    ('Noah Young', 'Oxford', '1984-01-03', 52, 'Male', NULL),
    ('Olivia Scott', 'Cambridge', '1988-06-11', 34, 'Female', 9)
  `);

  await connection.query(`INSERT INTO research_Papers (paper_title, conference, publish_date) VALUES
    ('Quantum AI Models', 'NeurIPS', '2020-12-01'),
    ('Advanced Cryptography', 'CryptoConf', '2019-08-10'),
    ('AI in Medicine', 'MedTech', '2021-06-14'),
    ('Neural Networks in Vision', 'CVPR', '2022-07-21'),
    ('Ethics in AI', 'AIConf', '2020-09-30'),
    ('Distributed Systems', 'IEEE', '2018-11-22'),
    ('Robotics in Surgery', 'RoboticsWorld', '2021-10-12'),
    ('Blockchain Scalability', 'BCSummit', '2020-03-05'),
    ('Deep Learning Frameworks', 'ICLR', '2021-04-18'),
    ('5G Networks', 'MobileWorld', '2019-05-28'),
    ('Natural Language Understanding', 'ACL', '2022-08-01'),
    ('Quantum Cryptography', 'QuantumConf', '2021-12-09'),
    ('Self-driving Car Safety', 'AutoAI', '2022-03-14'),
    ('Data Privacy Frameworks', 'PrivacyForum', '2020-01-22'),
    ('Green AI', 'EcoTech', '2021-09-05'),
    ('Edge Computing', 'IEEE', '2022-11-11'),
    ('Virtual Reality in Education', 'EdTech', '2021-02-07'),
    ('AI for Climate Modeling', 'ClimateTech', '2022-04-17'),
    ('Cybersecurity Trends', 'CyberCon', '2020-10-01'),
    ('Social Robots', 'HumanRobot', '2019-07-07'),
    ('AI & Law', 'LegalTech', '2022-05-16'),
    ('Brain-Computer Interfaces', 'NeuroLink', '2021-06-06'),
    ('AI Bias Mitigation', 'FairTech', '2020-08-24'),
    ('Autonomous Drones', 'DroneTech', '2022-01-01'),
    ('Intelligent Tutoring Systems', 'EdAI', '2019-12-12'),
    ('Reinforcement Learning', 'RLConf', '2021-03-03'),
    ('Speech Recognition Advances', 'SpeechTech', '2022-02-20'),
    ('Multimodal AI', 'VisionLang', '2021-05-25'),
    ('Explainable AI', 'XAIConf', '2020-07-07'),
    ('Big Data Analytics', 'DataWorld', '2022-06-06'),
    ('Medical Imaging AI', 'MedVision', '2021-11-15')
  `);

  await connection.query(`INSERT INTO authorPapers (author_id, paper_id) VALUES
    (1, 1), (2, 1), (3, 2), (4, 2),
    (1, 3), (8, 5), (4, 16), (8, 18),
    (9, 5), (10, 6), (2, 6), (11, 7),
    (3, 7), (12, 8), (4, 8), (9, 18),
    (8, 10), (9, 11), (10, 11), (10, 26),
    (11, 12), (12, 12), (13, 13), (14, 13),
    (15, 14), (1, 14), (2, 15), (3, 15),
    (10, 19), (11, 19), (12, 20), (13, 20),
    (14, 21), (15, 21), (1, 22), (2, 22),
    (3, 23), (4, 23), (8, 25), (9, 26), 
    (11, 27), (12, 27), (13, 28), (14, 28),
    (15, 29), (1, 29), (2, 30), (3, 30)
  `);

  console.log("\n Data Inserted Successfully");
} catch (error) {
  console.log(error);
}
await connection.end();
