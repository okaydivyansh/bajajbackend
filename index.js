const express = require("express");
const cors = require("cors");
const server = express();

// Middleware setup
server.use(
  cors({
    origin: "*",
    methods: "GET, POST",
    allowedHeaders: "Content-Type, Authorization",
  })
);

server.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "frame-ancestors 'none'; default-src 'self'; script-src 'self'"
  );
  next();
});

server.use(express.json());

server.use((req, res, next) => {
  console.log(`Path: ${req.path} | Method: ${req.method}`);
  next();
});

server.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

server.post("/bfhl", (req, res) => {
  const { data } = req.body;
  let numericArray = [];
  let alphabetArray = [];
  let topLowercaseAlpha = "";

  data.forEach((element) => {
    if (!isNaN(element)) {
      // If element is a number (including string representation of numbers)
      numericArray.push(element);
    } else if (element.length === 1 && /^[a-zA-Z]$/.test(element)) {
      // If element is a single alphabetical character
      alphabetArray.push(element);
    }
  });

  // Identify the highest lowercase alphabet
  const lowercaseAlphabets = alphabetArray.filter(
    (char) => char === char.toLowerCase()
  );
  if (lowercaseAlphabets.length > 0) {
    topLowercaseAlpha = lowercaseAlphabets.reduce((max, char) =>
      char > max ? char : max
    );
  }

  res.status(200).json({
    success: true,
    user_id: "Divyansh_Mishra_06042002",
    email: "divyansh.mishra2021@vitstudent.ac.in",
    roll_number: "21BIT0708",
    numbers: numericArray,
    alphabets: alphabetArray,
    highest_lowercase_alphabet: [topLowercaseAlpha],
  });
});

server.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

server.listen(3000, () => {
  console.log("Server is running on port", 3000);
});
