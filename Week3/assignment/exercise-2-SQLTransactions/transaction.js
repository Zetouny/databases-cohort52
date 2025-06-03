import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "w3_assignment",
});

await connection.beginTransaction();

// acting as variables
const transactionFrom = {
  account_number: 101,
  amount: -1000,
  changed_date: "25-06-02",
  remark: "transfer to account #102",
};

const transactionTo = {
  account_number: 102,
  amount: 1000,
  changed_date: "25-06-02",
  remark: "transfer from account #101",
};

try {
  const [availableBalance] = await connection.query(
    "SELECT balance FROM account WHERE account_number = ?",
    transactionFrom.account_number
  );

  if (availableBalance[0].balance < transactionFrom.amount * -1) {
    throw Error("insufficient balance to perform the transfer");
  }

  console.log(
    `Account #${transactionFrom.account_number} available balance: ${availableBalance[0].balance}`
  );

  await connection.query("INSERT INTO account_changes SET ?", transactionFrom);
  await connection.query(
    "UPDATE account SET balance = balance + ? WHERE account_number = ?",
    [transactionFrom.amount, transactionFrom.account_number]
  );

  console.log(
    `$${transactionFrom.amount * -1} deducted from account number ${
      transactionFrom.account_number
    }`
  );

  await connection.query("INSERT INTO account_changes SET ?", transactionTo);
  await connection.query(
    "UPDATE account SET balance = balance + ? WHERE account_number = ?",
    [transactionTo.amount, transactionTo.account_number]
  );

  console.log(
    `$${transactionTo.amount} added to account number ${transactionTo.account_number}`
  );

  await connection.commit();
  console.log("Transaction Completed Successfully.");
} catch (error) {
  await connection.rollback();
  console.error("Transaction Failed:", error);
}

await connection.end();
