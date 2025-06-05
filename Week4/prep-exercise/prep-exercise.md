## Exercise

Last week you updated your database to be normalized. Now that you have some more NoSQL knowledge, convert your database
to a document-based database. Think about the following:

- What are the collections?
- What information will you embed in a document and which will you store normalised?

## Answer

> For the recipes example I would personally create only one collection and embed all the information, otherwise I would separate the ingredients and categories from the recipe collection just to make sure the data is consistent.

```json
Recipes [
  {
    id: "001",
    name: "No-Bake Cheesecake",
    ingredients: [
      "Condensed milk",
      "Cream Cheese",
      "Lemon Juice",
      "Pie Crust",
      "Cherry Jam",
    ],
    steps: [
      "Beat Cream Cheese",
      "Add condensed Milk and blend",
      "Add Lemon Juice and blend",
      "Add the mix to the pie crust",
      "Spread the Cherry Jam",
      "Place in refrigerator for 3h.",
    ],
    categories: ["Cake", "No-Bake", "Vegetarian"],
  },
  {
    id: "002",
    name: "Roasted Brussels Sprouts",
    ingredients: [
      "Brussels Sprouts",
      "Lemon juice",
      "Sesame seeds",
      "Pepper",
      "Salt",
      "Olive oil",
    ],
    steps: [
      "Preheat the oven",
      "Mix the ingredients in a bowl",
      "Spread the mix on baking sheet",
      "Bake for 30'",
    ],
    categories: ["Vegan", "Gluten-Free"],
  }
];
```

## Discussion (Try to write answers to these questions in text, provide queries and commands when necessary)

- What made you decide when to embed information? What assumptions did you make?

  > I would embed all the information related directly to the recipe such as ingredients, even if it's shared with other recipes it's doesn't hold much information to be separated into different collection.

- If you were given MySQL and MongoDB as choices to build the recipe's database at the beginning, which one would you
  choose and why?
  > I would choose MongoDB because for recipes there are not much relations between the information.
