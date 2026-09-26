import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCheckout } from '../../store/userStore';
import { makeAuthenticatedRequest } from '../../service/axiosService';

const Checkout = () => {
    const { userData, checkoutProducts } = useSelector((state) => state.user);
    const totalPrice = checkoutProducts.reduce((acc, curr) => Number(acc) + Number(curr.price), 0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initPayment = (data) => {
		const options = {
			key: import.meta.env.VITE_RAZORPAY_KEY,
			amount: data.amount,
			currency: data.currency,
			description: `${userData?.name + ' Transaction'}`,
			order_id: data.id,
			handler: async (response) => {
				try {
					makeAuthenticatedRequest("api/product/verifyCheckout", "POST", response).then(() => {
						dispatch(clearCheckout());
                    	navigate('/finalFun');
					});
				} catch (error) {
					console.error(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			makeAuthenticatedRequest("api/product/checkoutProducts", "POST", { amount: totalPrice }).then((data) => {
				initPayment(data.data.data);
			});
		} catch (error) {
			console.log(error);
		}
	};

    return (
        <div className="container mx-auto mt-8 p-4">
			<h1 className="text-2xl font-semibold mb-4">Checkout</h1>
			{totalPrice <= 0 ? 
				<h1>Your cart is empty</h1> :
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{checkoutProducts.map((product) => (
					<div className="border p-4 mb-4" key={product.id}>
						<h2 className="text-lg font-semibold mb-2">{product.title}</h2>
						<p className="text-gray-600">${product.price}</p>
					</div>
					))}
				</div>
			}
			<div className="mt-8 border-t">
				<h2 className="text-xl font-semibold mb-2">Order Summary</h2>
				<p className="text-gray-600">Total: ${totalPrice}</p>
				<button 
					className={"bg-blue-500 text-white px-4 py-2 mt-4 rounded-full " + (totalPrice <= 0  ? "cursor-not-allowed" : "")}
					onClick={() => handlePayment()}
					disabled={totalPrice <= 0}
				>
					Place Order
				</button>
			</div>
        </div>
    );
};

export default Checkout;
