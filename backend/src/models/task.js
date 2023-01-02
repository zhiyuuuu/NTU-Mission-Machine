import mongoose from "mongoose";

const { Schema } = mongoose;

const TaskSchema = new Schema({
    name: { type: String },
    issuer: { type: String },
    due: { type: String },
    detail: { type: String },
    public_status: { type: String },
    receiver: { type: String },
    salary: { type: String }
}, {
    collection: 'Task',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const TaskModel = mongoose.model('Task', TaskSchema);

export default TaskModel;