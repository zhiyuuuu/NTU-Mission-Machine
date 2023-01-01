import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    password: { type: String },
    tasks: [{ type: mongoose.Types.ObjectId , ref: 'Task'}]
}, {
    collection: 'User',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;