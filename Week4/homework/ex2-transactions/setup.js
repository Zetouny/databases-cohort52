const setupDatabase = async (transactionCollection) => {
  const sampleData = [
    {
      account_number: 100,
      balance: 1200.5,
      account_changes: [
        {
          change_number: 1,
          amount: 200.0,
          changed_date: "2025-05-01",
          remark: "Initial deposit",
        },
      ],
    },
    {
      account_number: 101,
      balance: 3050.25,
      account_changes: [
        {
          change_number: 1,
          amount: 3050.25,
          changed_date: "2025-05-03",
          remark: "Salary credited",
        },
      ],
    },
    {
      account_number: 102,
      balance: 500.0,
      account_changes: [
        {
          change_number: 1,
          amount: -100.0,
          changed_date: "2025-05-04",
          remark: "ATM withdrawal",
        },
      ],
    },
    {
      account_number: 103,
      balance: 99999.99,
      account_changes: [
        {
          change_number: 1,
          amount: 50000.0,
          changed_date: "2025-05-05",
          remark: "Big deposit",
        },
      ],
    },
    {
      account_number: 104,
      balance: 0.0,
      account_changes: [
        {
          change_number: 1,
          amount: 0.0,
          changed_date: "2025-05-06",
          remark: "Account opened",
        },
      ],
    },
    {
      account_number: 105,
      balance: 780.55,
      account_changes: [
        {
          change_number: 1,
          amount: -19.45,
          changed_date: "2025-05-07",
          remark: "Service charge",
        },
      ],
    },
    {
      account_number: 106,
      balance: 2345.67,
      account_changes: [
        {
          change_number: 1,
          amount: 500.0,
          changed_date: "2025-05-08",
          remark: "Transfer from account 108",
        },
      ],
    },
    {
      account_number: 107,
      balance: 8900.12,
      account_changes: [
        {
          change_number: 1,
          amount: -1000.88,
          changed_date: "2025-05-09",
          remark: "Bill payment",
        },
      ],
    },
    {
      account_number: 108,
      balance: 100.75,
      account_changes: [
        {
          change_number: 1,
          amount: 100.75,
          changed_date: "2025-05-10",
          remark: "Refund received",
        },
      ],
    },
    {
      account_number: 109,
      balance: 750.0,
      account_changes: [
        {
          change_number: 1,
          amount: -250.0,
          changed_date: "2025-05-11",
          remark: "Online purchase",
        },
      ],
    },
  ];

  try {
    await transactionCollection.deleteMany({});

    await transactionCollection.insertMany(sampleData);

    console.log("Sample data added");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  setupDatabase,
};
