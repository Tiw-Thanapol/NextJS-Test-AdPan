import { useAppDispatch } from '@/redux/hooks';
import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import { removeFromCart } from '@/redux/features/cartSlice';

interface propsType {
    id: string;
    img: string;
    title: string;
    price: number;
    quantity: number;
}

const CartProduct: React.FC<propsType> = ({
    id, img, title, price, quantity,
}) => {
    const dispatch = useAppDispatch()

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <img className="h-[80px]" src={img} alt={title} />
                <div className="space-y-2">
                    <p className="text-gray-600 text-[14px]"> {quantity} x {price}.00THB.</p>
                </div>
            </div>
            <RxCross1
                className="cursor-pointer"
                onClick={() => dispatch(removeFromCart(id))} />
        </div>
    )
}

export default CartProduct
