import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

const db = new pg.Client({
  user : "postgres",
  host : "localhost",
  database : "world",
  password : "postgres",
  port : 5433,
});

db.connect();

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  res.render("index.ejs", {
    countries : countries,
    total : countries.length
  })
});

app.post("/add", (res, req) => {
  total += 1;
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
