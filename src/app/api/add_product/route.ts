
import Product from "@/libs/models/products";
import { connectMongoDB } from "@/libs/MongoConnection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try{
        const body = await request.json();
        const {imgSrc, fileKey, name, category, price} = body

        await connectMongoDB()

           // Validate the data (ensure all required fields are present)
           if (!imgSrc || !fileKey || !name || !category || !price) {
            return NextResponse.json(
                { msg: "All fields are required" },
                { status: 400 }
            );
        }

        const data = await Product.create({
        imgSrc,
        fileKey,
        name,
        category,
        price,
        })

        return NextResponse.json({msg: "Product added successfully", data})
    } catch(error) {
        return NextResponse.json({
            error,
            msg: "Something wrong"
        },
        { status:400}
    )

    }
}
    
/*
import Product from "@/libs/models/products";
import { connectMongoDB } from "@/libs/MongoConnection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { imgSrc, fileKey, name, category, price } = body;

        await connectMongoDB();

        if (!imgSrc || !fileKey || !name || !category || !price) {
            return NextResponse.json(
                { msg: "All fields are required" },
                { status: 400 }
            );
        }

        const newProduct = await Product.create({
            imgSrc,
            fileKey,
            name,
            category,
            price,
        });

        return NextResponse.json({ msg: "Product added successfully", product: newProduct });
    } catch (error) {
        return NextResponse.json(
            {
                error: error.message || "An error occurred",
                msg: "Something went wrong",
            },
            { status: 400 }
        );
    }
}
    */
