import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "w3_assignment",
});

try {
  await connection.query(`INSERT INTO account (account_number, balance) VALUES
    (100, 1200.50),
    (101, 3050.25),
    (102, 500.00),
    (103, 99999.99),
    (104, 0.00),
    (105, 780.55),
    (106, 2345.67),
    (107, 8900.12),
    (108, 100.75),
    (109, 750.00)
  `);

  const [account_data] = await connection.query(`SELECT * FROM account`);
  console.log("\n Sample data created for account table");
  console.table(account_data);

  await connection.query(`INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES
    (100, 200.00, '2025-05-01', 'Initial deposit'),
    (101, 3050.25, '2025-05-03', 'Salary credited'),
    (102, -100.00, '2025-05-04', 'ATM withdrawal'),
    (103, 50000.00, '2025-05-05', 'Big deposit'),
    (104, 0.00, '2025-05-06', 'Account opened'),
    (105, -19.45, '2025-05-07', 'Service charge'),
    (106, 500.00, '2025-05-08', 'Transfer from account 108'),
    (107, -1000.88, '2025-05-09', 'Bill payment'),
    (108, 100.75, '2025-05-10', 'Refund received'),
    (109, -250.00, '2025-05-11', 'Online purchase');
`);

  const [account_changes_data] = await connection.query(
    `SELECT * FROM account_changes`
  );
  console.log("\n Sample data created for account_changes table");
  console.table(account_changes_data);
} catch (error) {
  console.log(error);
}

await connection.end();
