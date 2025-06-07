## 1. What columns violate 1NF?

- food_code
- food_description

## 2. What entities do you recognize that could be extracted?

- Member
- Dinner
- Venue
- Food

## 3. Name all the tables and columns that would make a 3NF compliant solution

```sql
Members Table
+----------------+-------------------+
| Members                            |
+----------------+-------------------+
| member_id      | INT (Primary Key) |
| member_name    | VARCHAR           |
| member_address | VARCHAR           |
+----------------+-------------------+
```

```sql
Dinner Table
+-------------------+-------------------+
| Venues                                |
+-------------------+-------------------+
| dinner_id         | INT (Primary Key) |
| dinner_date       | DATE              |
+-------------------+-------------------+
```

```sql
Venues Table
+-------------------+-------------------+
| Venues                                |
+-------------------+-------------------+
| venue_code        | INT (Primary Key) |
| venue_description | VARCHAR           |
+-------------------+-------------------+
```

```sql
Food Table
+------------------+-----------------------+
| Food                                     |
+------------------+-----------------------+
| food_code        | VARCHAR (Primary Key) |
| food_description | VARCHAR               |
+------------------+-----------------------+
```

```sql
Member, Dinner Joined Table
+-------------------+-------------------+
| Member_Dinner                         |
+-------------------+-------------------+
| dinner_id         | INT (Primary Key) |
| member_id         | INT (FOREIGN KEY) |
+-------------------+-------------------+
```

```sql
Dinner, Venue Joined Table
+-------------------+-----------------------+
| Dinner_Venue                              |
+-------------------+-----------------------+
| dinner_id         | INT (Primary Key)     |
| venue_code        | VARCHAR (FOREIGN KEY) |
+-------------------+-----------------------+
```

```sql
Dinner, Food Joined Table
+-------------------+-----------------------+
| Dinner_Food                               |
+-------------------+-----------------------+
| dinner_id         | INT (Primary Key)     |
| food_code         | VARCHAR (FOREIGN KEY) |
+-------------------+-----------------------+
```
