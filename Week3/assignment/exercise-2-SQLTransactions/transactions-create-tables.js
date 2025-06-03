import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

try {
  await connection.query("CREATE DATABASE IF NOT EXISTS w3_assignment");
  await connection.query("USE w3_assignment");
  await connection.query("DROP TABLE IF EXISTS account, account_changes");

  await connection.query(`CREATE TABLE account (
    account_number INT AUTO_INCREMENT PRIMARY KEY,
    balance DECIMAL(19,4) NOT NULL
  )`);

  const [account] = await connection.query(`DESCRIBE account`);
  console.log("\n Account Table Created");
  console.table(account);

  await connection.query(`CREATE TABLE account_changes (
    change_number INT AUTO_INCREMENT PRIMARY KEY,
    account_number INT NOT NULL,
    amount DECIMAL(19,4) NOT NULL,
    changed_date DATE NOT NULL,
    remark TEXT,
    CONSTRAINT FK_Account_Number FOREIGN KEY (account_number) REFERENCES account(account_number) ON UPDATE CASCADE ON DELETE CASCADE
  )`);

  const [account_changes] = await connection.query(`DESCRIBE account_changes`);
  console.log("\n Account Changes Table Created");
  console.table(account_changes);
} catch (error) {
  console.log(error);
}

await connection.end();
