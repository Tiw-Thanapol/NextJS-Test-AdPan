/*
import { connectMongoDB } from "@/libs/MongoConnection";
import Product from "@/libs/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, URLParams: any) {
    try {
        const body = await request.json();
        const id = URLParams.params.id;

        const { name, category, price } = body;

        await connectMongoDB()

        const data = await Product.findByIdAndUpdate(id, {
            name, 
            category, 
            price,
        });

        return NextResponse.json({ msg: "Update Successfully", data })
    } catch (error) {
        return NextResponse.json({
            error,
            msg: "Something wrong"
        },
            { status: 400 }
        )
    }
}
*/

import { connectMongoDB } from "@/libs/MongoConnection";
import Product from "@/libs/models/products";
import { NextRequest, NextResponse } from "next/server";

interface URLParamsType {
    params: {
        id: string;
    };
}

export async function PUT(request: NextRequest, { params }: URLParamsType) {
    try {
        const body = await request.json();
        const { id } = params; // ดึงค่า id จาก params

        const { name, category, price } = body;

        await connectMongoDB();

        const data = await Product.findByIdAndUpdate(id, {
            name, 
            category, 
            price,
        }, { new: true }); // เพิ่ม { new: true } เพื่อคืนค่าที่อัปเดตแล้ว

        return NextResponse.json({ msg: "Update Successfully", data })
    } catch (error) {
        return NextResponse.json({
            error,
            msg: "Something went wrong"
        },
            { status: 400 }
        )
    }
}

