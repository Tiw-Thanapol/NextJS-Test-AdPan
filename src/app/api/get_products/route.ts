import Product from "@/libs/models/products";
import { connectMongoDB } from "@/libs/MongoConnection";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await connectMongoDB()

        const data = await Product.find()

        return NextResponse.json(data)
    } catch(error) {
        return NextResponse.json({
            error,
            msg: "Something wrong"
        },
        { status:400}
    )

    }
}