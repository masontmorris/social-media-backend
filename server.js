const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const mongoose = require("mongoose");

const { User, Thought } = require("./models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-network", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set("debug", true);

app.listen(PORT, () => {
    console.log(`Backend listening on ${PORT}!`);
});
