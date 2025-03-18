import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    empName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    newTask: {
        type: Number,
        default: 0
    },
    acttask: {
        type: Number,
        default: 0
    },
    completedTask: {
        type: Number,
        default: 0
    },
    failed: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', UserSchema);

export default User;