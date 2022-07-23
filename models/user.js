const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual("friendsCount").get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);
module.exports = User;
