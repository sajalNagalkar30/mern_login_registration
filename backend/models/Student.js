import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    standard: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;
