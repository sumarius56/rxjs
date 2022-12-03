const { Observable } = require("rxjs");
const { map } = require("rxjs/operators");

const users = {
  data: [
    {
      status: "active",
      language: "js",
      age: 30,
    },
    {
      status: "active",
      language: "cpp",
      age: 54,
    },
    {
      status: "active",
      language: "go",
      age: 10,
    },
    {
      status: "active",
      language: "js",
      age: 33,
    },
    {
      status: "inactive",
      language: "fortran",
      age: 90,
    },
  ],
};

const observable = new Observable((subscriber) => {
  subscriber.next(users);
}).pipe(
  map((value) => {
    console.log("observable data : ", value);
    return value.data;
  }),
  map((value) => {
    console.log("First Operator data : ", value);
    return value.filter((user) => user.status === "active");
  }),
  map((value) => {
    console.log("Second Operator data : ", value);
    return value.reduce((sum, user) => sum + user.age, 0) / value.length;
  })
);

const observer = {
  next: (value) => {
    console.log("Average age : " + value);
  },
  error: (error) => {
    console.log("error observer : " + error);
  },
  complete: () => {
    console.log("complete observer");
  },
};

observable.subscribe(observer);

const observable2 = new Observable((subscriber) => {
  subscriber.next(users);
}).pipe(
  map((value) => {
    return value.data;
  }),
  map((value) => {
    return value.map((user) => user.language);
  }),
  map((value) => {
    console.log("Programming langs : ", value);
    // which lang is used most
    return value.reduce((acc, lang) => {
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {});
  }),
  map((value) => {
    console.log("Number of users : ", value);
    // return the most used lang
    return Object.keys(value).reduce((a, b) => (value[a] > value[b] ? a : b));
  })
);

const observer2 = {
  next: (value) => {
    console.log("Most used language : " + value);
  },
  error: (error) => {
    console.log("error observer : " + error);
  },
  complete: () => {
    console.log("complete observer 2");
  },
};

observable2.subscribe(observer2);
