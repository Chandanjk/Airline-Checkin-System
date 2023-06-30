/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const { login_data, flights_data, passengers_data } = mockData;
const data = JSON.stringify({ login_data, flights_data, passengers_data });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
