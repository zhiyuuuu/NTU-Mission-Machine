import mongoose from "mongoose";

const { Schema } = mongoose;

const TaskSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    issuer: { type: String, required: [true, 'Supplier field is required.'] },
    due: { type: String },
    detail: { type: String },
    public_status: { type: String}
}, {
    collection: 'Task',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const TaskModel = mongoose.model('Task', TaskSchema);

export default TaskModel;