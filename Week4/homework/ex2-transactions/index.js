const { MongoClient } = require("mongodb");
require("dotenv").config();
const { setupDatabase } = require("./setup.js");
const { transfer } = require("./transfer.js");

async function main() {
  const client = new MongoClient(process.env.MONGODB_URL);
  const transactionCollection = client
    .db("databaseWeek4")
    .collection("transactions");

  await client.connect();

  // Clear the collection, and re-insert the sample data.
  await setupDatabase(transactionCollection);

  // Successful transaction
  await transfer(
    client,
    transactionCollection,
    101,
    102,
    1000,
    "A transaction from account number 101, to 102"
  );

  // Insufficient balance
  await transfer(
    client,
    transactionCollection,
    104,
    100,
    1000,
    "A transaction from account number 104, to 100"
  );

  // Non-existing account
  await transfer(
    client,
    transactionCollection,
    110,
    100,
    1000,
    "A transaction from account number 104, to 100"
  );

  await client.close();
}

main();
