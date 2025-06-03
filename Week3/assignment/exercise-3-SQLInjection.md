#### You are given the below function which returns the population of a specific country from the world database

```js
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
```

#### 1. Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and ( fetch all the records in the database)

```
We can pass any value followed by OR 1=1 to bypass that criteria, or we can simply add a full SQL syntax to the last variable
```

```sql
1. SELECT population FROM country WHERE Name = 'Netherlands' OR 1=1 and code = 'NLD' OR 1=1;
2. SELECT population FROM country WHERE Name = 'Netherlands' and code = 'NLD'; SELECT * FROM country;
```

#### 2. Rewrite the function so that it is no longer vulnerable to SQL injection

```js
conn.query("SELECT Population FROM country WHERE Name = ? and code = ?", [${name}, ${code}])
```
