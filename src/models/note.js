const mongoose = require("mongoose");


// Define the note's database schema
const NoteScheme = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        // Assigns createdAt and updatedAt fields with a Date type
        timestamps: true
    }
);

// Define the 'Note' model with the schema
const Note = mongoose.model("Note", NoteScheme);

module.exports = Note;