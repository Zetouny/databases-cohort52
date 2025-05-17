import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

connection.connect();

try {
  await connection.query(`CREATE TABLE Invitee (
    invitee_no int,
    invitee_name varchar(100),
    invited_by varchar(100)
  )`);

  await connection.query(`INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES 
    (1, 'Ahmad Alwan', 'Sara Hamdan'),
    (2, 'Nora Khaled', 'Ahmad Alwan'),
    (3, 'Tariq Hussein', 'Layla Mansour'),
    (4, 'Yasmine Omar', 'Nora Khaled'),
    (5, 'Omar Zaid', 'Ahmad Alwan');
  `);

  const [invitee_rows] = await connection.query(`SELECT * FROM Invitee`);
  console.log("\n Invitee Table:");
  console.table(invitee_rows);

  await connection.query(`CREATE TABLE Room (
    room_no int,
    room_name varchar(100),
    floor_number int
  )`);

  await connection.query(`INSERT INTO Room (room_no, room_name, floor_number) VALUES 
    (101, 'Innovation Hall', 1),
    (102, 'Conference Room A', 2),
    (103, 'Tech Hub', 3),
    (104, 'Board Room', 4),
    (105, 'Creative Studio', 1);
  `);

  const [room_rows] = await connection.query(`SELECT * FROM Room`);
  console.log("\n Room Table:");
  console.table(room_rows);

  await connection.query(`CREATE TABLE Meeting (
    meeting_no int,
    meeting_title varchar(100),
    starting_time datetime,
    ending_time datetime,
    room_no int
  )`);

  await connection.query(`INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES 
    (1, 'Product Kickoff', '2025-05-18 09:00:00', '2025-05-18 10:00:00', 101),
    (2, 'Design Review', '2025-05-18 11:00:00', '2025-05-18 12:00:00', 102),
    (3, 'Tech Sync', '2025-05-18 14:00:00', '2025-05-18 15:00:00', 103),
    (4, 'Marketing Strategy', '2025-05-18 10:30:00', '2025-05-18 11:30:00', 104),
    (5, 'Brainstorm Session', '2025-05-18 16:00:00', '2025-05-18 17:00:00', 105);
  `);

  const [meeting_rows] = await connection.query(`SELECT * FROM Meeting`);
  console.log("\n Meeting Table:");
  console.table(meeting_rows);
} catch (error) {
  console.log(error);
}

try {
  const [results, fields] = await connection.query(
    `drop table Invitee, Room, Meeting`
  );
} catch (error) {
  console.log(error);
}

connection.end();
