const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
    res.json({ message: "Flight Management API is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
