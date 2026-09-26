import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { makeAuthenticatedRequest } from "../../service/axiosService";
import { API_METHODS } from "../../utility/constant";
import { Spin } from "antd";

const Product = () => {
    const [productList, SetProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const filteredProducts = productList.filter((product) =>
        `${product.title} ${product.description}`.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setError(null)
                const response = await makeAuthenticatedRequest('api/product/', API_METHODS.GET)
                if (!response?.data) throw new Error('Unable to load products')
                await updateProductListWithImages(response.data)
            } catch (requestError) {
                console.error('Error loading products:', requestError)
                setError('Products could not be loaded. Check that the backend is running and try again.')
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, []);

    const updateProductListWithImages = (products) => {
        const updatedProductList = products.map((product) => {
            const imagePath = product.image_path?.replaceAll('\\', '/')
            const imageUrl = imagePath ? `${import.meta.env.VITE_LOCAL_URL}${imagePath}` : ''
            return { ...product, imageUrl }
        })
        SetProductList(updatedProductList)
    };

    return (
    <main className="style-app w-full px-3 pb-16 sm:px-5">
        {loading ? 
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
            <Spin size="large" />
            <p className="mt-4 text-sm font-medium text-slate-500">Loading your collection...</p>
        </div> :
        error ?
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-lg font-semibold text-slate-700">{error}</p>
            <button onClick={() => window.location.reload()} className="rounded-lg bg-cyan-600 px-5 py-2.5 font-semibold text-white hover:bg-cyan-700">Try again</button>
        </div> :
                <>
                    <header className="mx-auto w-[94%] pb-6 pt-6 sm:pb-8 sm:pt-8">
                        <div>
                            <p className="text-[13px] text-[#854f0b]">New season collection</p>
                            <h1 className="style-heading mt-1 text-[26px] font-semibold text-[#1a1a1a]">Everyday style, thoughtfully chosen</h1>
                            <p className="mt-1 max-w-xl text-[13px] leading-6 text-[#767676]">Simple pieces for your wardrobe, made to feel as good as they look.</p>
                        </div>
                    </header>
                    <div className="mx-auto mb-6 flex w-[94%] items-center rounded-lg border border-[#e5e5e5] px-3 py-2.5">
                        <span className="mr-2 text-[#767676]">⌕</span>
                        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." className="w-full border-0 text-[13px] outline-none placeholder:text-[#767676]" />
                    </div>
                    {filteredProducts.length ? <div className="mx-auto grid w-[94%] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                        {filteredProducts.map((product) => <ProductCard key={product.id || product._id} product={product}/>) }
                    </div> : <div className="mx-auto mt-12 max-w-md text-center"><p className="style-heading text-lg font-semibold text-[#333]">{search ? 'No products found' : 'Your collection is waiting'}</p><p className="mt-2 text-sm text-[#767676]">{search ? `No products match “${search}”. Try another search.` : 'No products are available yet.'}</p></div>}
                </>}
            </main>
        );
}

export default Product;