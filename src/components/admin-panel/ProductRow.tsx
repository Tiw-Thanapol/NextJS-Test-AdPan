import { IProduct } from "@/app/admin/dashboard/page";
import { setLoading } from "@/redux/features/loadingSlice";
import { setProduct } from "@/redux/features/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { makeToast } from "@/utils/helpers";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

interface PropsType {
    SRNo: number;
    setOpenPopup: Dispatch<SetStateAction<boolean>>;
    setUpdateTable: Dispatch<SetStateAction<boolean>>;
    product: IProduct
}

const ProductRow = ({
    SRNo,
    setOpenPopup,
    setUpdateTable,
    product,
}: PropsType) => {
    const dispatch = useAppDispatch()

    const onEdit = () => {
        dispatch(setProduct(product))
        setOpenPopup(true);
    };
    const onDelete = async () => {
        if(!confirm("Do you want to delete this product?"))
            return;
        dispatch(setLoading(true))

        const payLoad = {
            fileKey: product.fileKey,
        }
        await axios 
            .delete("/api/uploadthing", { data: payLoad })
            .then(res => {
                console.log(res.data)

                axios
                    .delete(`/api/delete_product/${product._id}`)
                    .then(res => {
                        console.log(res.data)
                        makeToast("Product deleted Successful!")
                        setUpdateTable((prevState) => !prevState)
                    })
                    .catch((err) => console.log(err))
                    .finally(() => dispatch(setLoading(false)))
            })
            .catch((err) => console.log(err))
    };
    return (
        <tr>
            <td>
                <div>
                    {SRNo}
                </div>
            </td>
            <td>
                <div>{product.name}</div>
            </td>
            <td>THB. {product.price}</td>
            <td className="py-2">
                <img
                    src={product.imgSrc}
                    width={40}
                    height={40}
                    alt="product_image"
                />
            </td>
            <td>
                <div className="text-2xl flex items-center gap-2 text-gray-600">
                    <CiEdit
                        className="cursor-pointer hover:text-black"
                        onClick={onEdit}
                    />
                    <RiDeleteBin5Line
                        className="text-[20px] cursor-pointer hover:text-red-600"
                        onClick={onDelete}
                    />
                </div>
            </td>
        </tr>
    )
}

export default ProductRow
