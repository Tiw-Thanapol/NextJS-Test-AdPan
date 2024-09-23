/*
import { connectMongoDB } from "@/libs/MongoConnection";
import Product from "@/libs/models/products";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest, URLParams: any) {
    try {   
        const id = URLParams.params.id;

        await connectMongoDB()

        await Product.findByIdAndDelete(id)

        return NextResponse.json({ msg: "Deleted Successfully"})
    } catch (error) {
        return NextResponse.json({
            error,
            msg: "Something went wrong"
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

export async function DELETE(request: NextRequest, { params }: URLParamsType) {
    try {
        const { id } = params; // ดึงค่า id จาก params

        await connectMongoDB();

        // ลบสินค้าตาม id
        const data = await Product.findByIdAndDelete(id);

        // ตรวจสอบว่าพบ product และลบสำเร็จหรือไม่
        if (!data) {
            return NextResponse.json({
                msg: "Product not found",
            }, { status: 404 });
        }

        return NextResponse.json({ msg: "Deleted Successfully" })
    } catch (error) {
        return NextResponse.json({
            error,
            msg: "Something went wrong"
        },
            { status: 400 }
        )
    }
}