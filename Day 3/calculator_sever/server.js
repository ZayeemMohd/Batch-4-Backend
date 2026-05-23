const express = require("express");
const app = express();

app.get("/search", (req, res) => {
  const { q } = req.query;

  res.status(200).json({ message: `websites related to ${q}` });
});

app.get("/calculator/:operation/:a/:b", (req, res) => {
  const { operation, a, b } = req.params;
  let result;

  switch (operation) {
    case "addition":
      result = parseFloat(a) + parseFloat(b);
      break;
    case "subtract":
      result = parseFloat(a) - parseFloat(b);
      break;
    case "multiply":
      result = parseFloat(a) * parseFloat(b);
      break;
    case "divide":
      result = parseFloat(a) / parseFloat(b);
      break;
    default:
      result = "Invalid operation";
  }

  res.json({ result: result });
});

app.use((req, res) => {
  res.json({ error: "Nai hai, Not Found", status: 404 }).status(200);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
