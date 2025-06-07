const transfer = async (
  client,
  transactionCollection,
  fromAccount,
  toAccount,
  amount,
  remark
) => {
  const session = client.startSession();

  try {
    session.startTransaction();

    const isExistFromAccount = await transactionCollection.findOne(
      { account_number: fromAccount },
      {
        projection: {
          balance: 1,
          maxChangeNumber: { $max: "$account_changes.change_number" },
        },
      }
    );

    const isExistToAccount = await transactionCollection.findOne(
      { account_number: toAccount },
      {
        projection: {
          maxChangeNumber: { $max: "$account_changes.change_number" },
        },
      }
    );

    if (!isExistFromAccount || !isExistToAccount) {
      throw Error("Invalid Account(s)");
    }

    if (isExistFromAccount.balance < amount) {
      throw Error("insufficient balance to perform the transfer");
    }

    await transactionCollection.updateOne(
      { account_number: fromAccount },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: ++isExistFromAccount.maxChangeNumber,
            amount: -amount,
            changed_date: "2025-05-11",
            remark: remark,
          },
        },
      },
      { session }
    );

    await transactionCollection.updateOne(
      { account_number: toAccount },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: ++isExistToAccount.maxChangeNumber,
            amount: amount,
            changed_date: "2025-05-11",
            remark: remark,
          },
        },
      },
      { session }
    );

    await session.commitTransaction();
    console.log("Transaction successfully committed.");
  } catch (error) {
    console.log(
      "Transaction aborted due to the following error: ",
      error.message
    );
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
};

module.exports = {
  transfer,
};
