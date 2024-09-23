"use client"
import { setLoading } from '@/redux/features/loadingSlice';
import { useAppDispatch } from '@/redux/hooks';
import { makeToast } from '@/utils/helpers';
import axios from 'axios';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react'
import { UploadButton } from "@/utils/uploadthing";

interface IPayload {
    imgSrc: null | string;
    fileKey: null | string;
    name: string;
    category: string;
    price: string;
}

const ProductForm = () => {

    const [payLoad, setPayLoad] = useState<IPayload>({
        imgSrc: null,
        fileKey: null,
        name: "",
        category: "",
        price: ""
    })

    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(setLoading(true))

        axios.post("/api/add_product", payLoad)
            .then((res) => {
                if(res.status ===200){
                makeToast("Product added Successfully")
                setPayLoad({
                    imgSrc: null,
                    fileKey: null,
                    name: "",
                    category: "",
                    price: ""
                });
            } else {
                makeToast("Failed to add Product")
            }
            }).catch(err => console.log(err))
            .finally(() => dispatch(setLoading(false)))
    }
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Image
                className="max-h-[300px] w-auto object-contain rounded-md"
                src={payLoad.imgSrc ? payLoad.imgSrc : "/placeholder.jpg"}
                width={800}
                height={500}
                alt="product_image"
            />

            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    alert("Upload Completed");

                    setPayLoad({
                        ...payLoad,
                        imgSrc: res[0]?.url,
                        fileKey: res[0]?.key,
                    })
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />

            <div>
                <label className="block ml-1">Product Name</label>
                <input className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
                    type='text'
                    value={payLoad.name}
                    onChange={(e) => setPayLoad({ ...payLoad, name: e.target.value })}
                    required
                />
            </div>
            <div>
                <label className="block ml-1">Product Category</label>
                <input className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
                    type='text'
                    value={payLoad.category}
                    onChange={(e) => setPayLoad({ ...payLoad, category: e.target.value })}
                    required
                />
            </div>
            <div>
                <label className="block ml-1">Product Price</label>
                <input className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
                    type='text'
                    value={payLoad.price}
                    onChange={(e) => setPayLoad({ ...payLoad, price: e.target.value })}
                    required
                />
            </div>
            <div className="flex justify-end">
                <button className="bg-pink text-white px-8 py-2 rounded-md">Add</button>
            </div>
        </form>
    )
}

export default ProductForm