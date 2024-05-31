import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin123@cluster0.wwselzr.mongodb.net/Citas?retryWrites=true&w=majority')
        console.log('>>> DB is connected');
    } catch (error) {
        console.error(error);
    }
}
