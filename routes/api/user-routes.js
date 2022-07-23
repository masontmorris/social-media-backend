const app = require("express").Router();
const { User } = require("../../models");

app.post("/", ({ body }, res) => {
    User.create(body)
        .then((dbUser) => res.json(dbUser))
        .catch((err) => res.status(422).json(err));
});

app.get("/", (req, res) => {
    User.find()
        .select("-__v")
        .then((userData) => {
            console.log(userData);
            res.json(userData);
        })
        .catch((err) => res.status(422).json(err));
});

app.get("/:id", ({ params, body }, res) => {
    User.findOne({ _id: params.id })
        .select("-__v")
        .then((userData) => {
            if (!userData) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.json(userData);
            }
        })
        .catch((err) => res.status(422).json(err));
});

app.put("/:id", ({ body, params }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbUser) => {
            if (!dbUser) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.json(dbUser);
            }
        })
        .catch((err) => res.status(422).json(err));
});

app.delete("/:id", ({ params }, res) => {
    User.findOneAndDelete({ _id: params.id })
        .then((dbUser) => {
            if (!dbUser) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.json(dbUser);
            }
        })
        .catch((err) => res.status(422).json(err));
});

app.post("/:id/friends/:friendId", ({ body, params }, res) => {
    User.findOneAndUpdate({ _id: params.id }, { $push: { friends: body.friendId } }, { new: true })
        .then((dbUser) => {
            if (!dbUser) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.json(dbUser);
            }
        })
        .catch((err) => res.status(422).json(err));
});

app.delete("/:id/friends/:friendId", ({ params }, res) => {
    User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true })
        .then((dbUser) => {
            if (!dbUser) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.json(dbUser);
            }
        })
        .catch((err) => res.status(422).json(err));
});

module.exports = app;
