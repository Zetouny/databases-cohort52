const { MongoClient } = require("mongodb");
const csvtojson = require("csvtojson");
require("dotenv").config();

async function main() {
  const client = new MongoClient(process.env.MONGODB_URL);

  try {
    await client.connect();
    const collection = client.db("databaseWeek4").collection("aggregation");

    // =-=-= STEP 1: delete existing data and re-add entries from csv file =-=-=
    await collection.deleteMany({});

    const fileName =
      "Week4/homework/ex1-aggregation/population_pyramid_1950-2022.csv";
    const jsonData = await csvtojson({
      colParser: {
        column1: "string",
        column2: "number",
        column3: "string",
        column4: "number",
        column5: "number",
      },
      checkType: true,
    }).fromFile(fileName);

    await collection.insertMany(jsonData);

    console.log("\n Step 1: \n", "Data has been added");

    // =-=-= STEP 2: find total population for a country grouped by year =-=-=
    const findPopulation = collection.aggregate([
      {
        $match: {
          Country: "Netherlands",
        },
      },
      {
        $group: {
          _id: "$Year",
          countPopulation: {
            $sum: {
              $add: ["$M", "$F"],
            },
          },
        },
      },
      {
        $sort: {
          countPopulation: 1,
        },
      },
    ]);

    console.log("\n Step 2: \n", await findPopulation.toArray());

    // =-=-= STEP 3: get all continents' information, and the total population for a certain age group  =-=-=
    const getData = collection.aggregate([
      {
        $match: {
          Country: {
            $regex: "^[A-Z ]+$",
          },
          Year: 2020,
          Age: "100+",
        },
      },
      {
        $addFields: {
          TotalPopulation: {
            $sum: {
              $add: ["$M", "$F"],
            },
          },
        },
      },
    ]);

    console.log("\n Step 3: \n", await getData.toArray());
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main();
