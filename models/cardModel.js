const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
    cardTitle: {
        type: String,
        required: [true, "Please fill your title"],
    },
    description: {
        type: String,
        trim: true,
    },
    projectName: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        default: "backlog"
    },
});


const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
