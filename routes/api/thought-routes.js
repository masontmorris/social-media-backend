const app = require("express").Router();
const { Thought, User } = require("../../models");

app.post("/", ({ body }, res) => {
    Thought.create(body)
        .then((dbThought) => res.json(dbThought))
        .catch((err) => res.status(422).json(err));
});

app.get("/", (req, res) => {
    Thought.find()
        .select("-__v")
        .sort("-createdAt")
        .then((thoughtData) => {
            console.log(thoughtData);
            res.json(thoughtData);
        })
        .catch((err) => res.status(422).json(err));
});

app.get("/:id", ({ params }, res) => {
    Thought.findOne({ _id: params.id })
        .select("-__v")
        .then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({ message: "Thought not found" });
            } else {
                res.json(thoughtData);
            }
        });
});

app.put("/:id", ({ body, params }, res) => {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbThought) => {
            if (!dbThought) {
                res.status(404).json({ message: "Thought not found" });
            } else {
                res.json(dbThought);
            }
        })
        .catch((err) => res.status(422).json(err));
});

app.delete("/:userId/:thoughtId", ({ params }, res) => {
    Thought.findOneAndDelete({ _id: params.id })
        .then((dbThought) => {
            if (!dbThought) {
                res.status(404).json({ message: "Thought not found" });
            } else {
                res.json(dbThought);
            }
        })
        .catch((err) => res.status(422).json(err));
});

app.post("/:id", ({ body, params }, res) => {
    Thought.findOneAndUpdate({ _id: params.id }, { $push: { reactions: body } }, { new: true })
        .select("-__v")
        .then((dbThought) => {
            if (!dbThought) {
                res.status(404).json({ message: "Thought not found" });
            } else {
                res.json(dbThought);
            }
        });
});

app.delete("/:userId/:thoughtId/:reactionId", ({ params }, res) => {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { _id: params.reactionId } } }, { new: true })
        .select("-__v")
        .then((dbThought) => {
            if (!dbThought) {
                res.status(404).json({ message: "Thought not found" });
            } else {
                res.json(dbThought);
            }
        });
});
