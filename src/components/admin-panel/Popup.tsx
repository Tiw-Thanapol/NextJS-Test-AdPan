
import { setLoading } from '@/redux/features/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { makeToast } from '@/utils/helpers';
import Image from 'next/image';
import { UploadButton } from "@/utils/uploadthing";
import axios from 'axios';
import React, {
    Dispatch,
    FormEvent,
    SetStateAction,
    useState
} from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface PropsType {
    setOpenPopup: Dispatch<SetStateAction<boolean>>;
    setUpdateTable: Dispatch<SetStateAction<boolean>>;
}
export const Popup = ({ setOpenPopup, setUpdateTable }: PropsType) => {

    interface IPayload {
        imgSrc: null | string;
        fileKey: null | string;
        name: string;
        category: string;
        price: string;
    }
        const [payLoad, setPayLoad] = useState<IPayload>({
            imgSrc: null,
            fileKey: null,
            name: "",
            category: "",
            price: ""
        })
    const productData = useAppSelector((state) => state.productReducer)
    const dispatch = useAppDispatch()
        /*
    const [inputData, setInputData] = useState({
        name: productData.name,
        category: productData.category,
        price: productData.price
    })*/
        const [inputData, setInputData] = useState<{
            name: string;
            category: string;
            price: string;
        }>({
            name: productData.name || "",
            category: productData.category || "",
            price: productData.price || ""
        });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(setLoading(true))

        axios.put(`/api/edit_product/${productData._id}`, inputData,)
            .then((res) => {
                if(res.status === 200){ 
                    makeToast("Product Updated Successfully")
                    setUpdateTable((prevState) => !prevState)
                } else {
                    makeToast("Failed to add Product")
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                dispatch(setLoading(false))
                setOpenPopup(false)
            })
        axios.put("/api/edit_product/${productData._id}", payLoad)
            .then((res) => {
                if (res.status === 200){
                makeToast("Product Updated Successfully")
                setUpdateTable((prevState) => !prevState)
                setPayLoad({
                    imgSrc: null,
                    fileKey: null,
                    name: "",
                    category: "",
                    price: ""
                })
                } else {
                    makeToast("Failed to add Product")
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                dispatch(setLoading(false))
                setOpenPopup(false)
            })
    }

    return (
        <div className='fixed top-0 left-0 w-full h-screen bg-[#00000070] grid place-items-center' >
            <div className="bg-white w-[700px] py-8 rounded-lg text-center relative">
                <IoIosCloseCircleOutline
                    className="absolute text-2xl right-0 top-0 m-4 cursor-pointer hover:text-red-600"
                    onClick={() => setOpenPopup(false)}
                />

                <form className="mt-6 w-fit space-y-4 mx-auto" onSubmit={handleSubmit}>

                    <h2 className="text-2xl mt-3">Edit Product</h2>
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
                    alert(error! );
                }}
            /> 
                    <div className="mb-4 flex items-center">
                        <label className="w-1/3 text-gray-700">Product Name</label>
                        <input
                            className="border border-gray-300 outline-none px-4 py-2 rounded-lg w-2/3"
                            type="text"
                            placeholder="Name"
                            value={inputData.name}
                            onChange={(e) =>
                                setInputData({ ...inputData, name: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <label className="w-1/3 text-gray-700">Product Category</label>
                        <input
                            className="border border-gray-300 outline-none px-4 py-2 rounded-lg w-2/3"
                            type="text"
                            placeholder="Category"
                            value={inputData.category}
                            onChange={(e) =>
                                setInputData({ ...inputData, category: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <label className="w-1/3 text-gray-700">Product Price</label>
                        <input
                            className="border border-gray-300 outline-none px-4 py-2 rounded-lg w-2/3"
                            type="text"
                            placeholder="Price"
                            value={inputData.price}
                            onChange={(e) =>
                                setInputData({ ...inputData, price: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-accent block text-white px-8 py-2 rounded-lg self-center">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Popup;


/*
import { setLoading } from '@/redux/features/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { makeToast } from '@/utils/helpers';
import Image from 'next/image';
import { UploadButton } from "@/utils/uploadthing";
import axios from 'axios';
import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface PropsType {
    setOpenPopup: Dispatch<SetStateAction<boolean>>;
    setUpdateTable: Dispatch<SetStateAction<boolean>>;
}

export const Popup = ({ setOpenPopup, setUpdateTable }: PropsType) => {
    interface IPayload {
        imgSrc: null | string;
        fileKey: null | string;
        name: string;
        category: string;
        price: string;
    }

    const [payLoad, setPayLoad] = useState<IPayload>({
        imgSrc: null,
        fileKey: null,
        name: "",
        category: "",
        price: ""
    });

    const productData = useAppSelector((state) => state.productReducer);
    const dispatch = useAppDispatch();

    const [inputData, setInputData] = useState<{
        name: string;
        category: string;
        price: string;
    }>({
        name: productData.name || "",
        category: productData.category || "",
        price: productData.price || ""
    });

    // อัปเดต inputData เมื่อ productData เปลี่ยนแปลง
    useEffect(() => {
        setInputData({
            name: productData.name || "",
            category: productData.category || "",
            price: productData.price || ""
        });
    }, [productData]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));

        const dataToUpdate = {
            ...inputData,
            ...payLoad
        };

        axios.put(`/api/edit_product/${productData._id}`, dataToUpdate)
            .then((res) => {
                if (res.status === 200) {
                    makeToast("Product Updated Successfully");
                    setUpdateTable((prevState) => !prevState);
                    setPayLoad({
                        imgSrc: null,
                        fileKey: null,
                        name: "",
                        category: "",
                        price: ""
                    });
                } else {
                    makeToast("Failed to update the product");
                }
                console.log(res.data); // ตรวจสอบผลลัพธ์ที่ได้จาก API
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                dispatch(setLoading(false));
                setOpenPopup(false);
            });
    };

    return (
        <div className='fixed top-0 left-0 w-full h-screen bg-[#00000070] grid place-items-center'>
            <div className="bg-white w-[700px] py-8 rounded-lg text-center relative">
                <IoIosCloseCircleOutline
                    className="absolute text-2xl right-0 top-0 m-4 cursor-pointer hover:text-red-600"
                    onClick={() => setOpenPopup(false)}
                />
                <form className="mt-6 w-fit space-y-4 mx-auto" onSubmit={handleSubmit}>
                    <h2 className="text-2xl mt-3">Edit Product</h2>
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
                            setPayLoad({
                                ...payLoad,
                                imgSrc: res[0]?.url,
                                fileKey: res[0]?.key,
                            });
                            alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                    <div className="mb-4 flex items-center">
                        <label className="w-1/3 text-gray-700">Product Name</label>
                        <input
                            className="border border-gray-300 outline-none px-4 py-2 rounded-lg w-2/3"
                            type="text"
                            placeholder="Name"
                            value={inputData.name}
                            onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-1/3 text-gray-700">Product Category</label>
                        <input
                            className="border border-gray-300 outline-none px-4 py-2 rounded-lg w-2/3"
                            type="text"
                            placeholder="Category"
                            value={inputData.category}
                            onChange={(e) => setInputData({ ...inputData, category: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-1/3 text-gray-700">Product Price</label>
                        <input
                            className="border border-gray-300 outline-none px-4 py-2 rounded-lg w-2/3"
                            type="text"
                            placeholder="Price"
                            value={inputData.price}
                            onChange={(e) => setInputData({ ...inputData, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-accent block text-white px-8 py-2 rounded-lg self-center">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Popup;

*/