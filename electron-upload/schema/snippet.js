const { Schema, model } = require('mongoose');

const SnippetSchema = new Schema({
    searchId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    }
});


module.exports = model('Snippet', SnippetSchema);