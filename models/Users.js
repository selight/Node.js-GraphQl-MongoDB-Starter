const {model, Schema} = require("mongoose");

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const User = model("users", UserSchema);

module.exports = User;