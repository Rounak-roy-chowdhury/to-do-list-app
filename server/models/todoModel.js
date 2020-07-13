const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userId: { type: Number, default: 1 },
    taskName: { type: String },
    taskDescription: { type: String },
    deadline: { type: Date },
    isDone: { type: Boolean, default: false },
    priority:{type: Boolean, default: false},
    overdue:{type: Boolean, default: false},
    label:{type: String},
    dateTaskDone: { type: Date }
}, {
    timestamps: [{ createdAt: 'created_at', updatedAt: 'updated_at' }],
});


module.exports = mongoose.model('Todo', todoSchema);