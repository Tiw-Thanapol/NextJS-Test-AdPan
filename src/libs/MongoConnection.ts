/*
import mongoose from "mongoose"

export const connectMongoDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise()
    }
    return await mongoose.connect(process.env.MONGO_URI!)
}
*/

import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        // ตรวจสอบว่ามีการเชื่อมต่ออยู่แล้วหรือไม่
        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB is already connected.");
            return mongoose.connection.asPromise();
        }

        // ทำการเชื่อมต่อกับ MongoDB
        const connection = await mongoose.connect(process.env.MONGO_URI!);
        console.log("MongoDB connected successfully.");
        return connection;
    } catch (error) {
        // ล็อกข้อผิดพลาดและขว้างข้อผิดพลาดเพื่อให้ฟังก์ชันที่เรียกใช้งานสามารถจัดการได้
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};
