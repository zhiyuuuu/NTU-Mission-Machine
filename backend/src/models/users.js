import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    password: { type: String },
    taskCount: { type: Number, default: 0 }
}, {
    collection: 'User',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;