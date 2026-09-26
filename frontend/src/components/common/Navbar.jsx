import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../store/userStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";

const Navbar = () => {
    const { userData, checkoutProducts } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const showBackButton = location.pathname !== "/";

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        navigate("/");
    };

    return (
        <>
            <nav className="sticky top-0 z-10 border-b border-[#e5e5e5] bg-white px-5 py-4 sm:px-8">
                <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center">
                        {showBackButton && (
                            <button
                                type="button"
                                aria-label="Go back"
                                title="Go back"
                                onClick={handleBack}
                                className="mr-3 rounded-lg p-2 text-[#1a1a1a] transition hover:bg-[#fafafa]"
                            >
                                <ArrowLeftOutlined style={{ fontSize: '18px' }} />
                            </button>
                        )}
                        <Link to="/" className="style-logo text-xl font-semibold text-[#1a1a1a]">Styley</Link>
                    </div>
                    { userData?.name ?
                    <div className="flex w-full items-center justify-end gap-2 sm:w-auto sm:gap-4">
                        <label className="hidden text-sm text-[#767676] md:block">Welcome {userData?.name}!</label>
                        {userData?.isAdmin && <button onClick={() => {navigate("/productUpload")}} className="rounded-lg bg-[#1a1a1a] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#333]">Add product</button>}
                        <button className="rounded-lg border border-[#1a1a1a] bg-transparent px-3 py-2 text-sm font-medium text-[#1a1a1a] transition hover:bg-[#1a1a1a] hover:text-white" onClick={() => dispatch(clearUser())}>Logout</button>
                        <Badge size="small" count={checkoutProducts.length}>
                            <button aria-label="Open cart" className="rounded-lg p-2 text-[#1a1a1a] transition hover:bg-[#fafafa]" onClick={() => {navigate("/checkout")}}><ShoppingCartOutlined style={{ fontSize: '22px' }} /></button>
                        </Badge>
                    </div> :
                    <div className="flex items-center">
                        <a href="/login" className="text-gray-500 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</a>
                        <a href="/signup" className="text-gray-500 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Sign up</a>
                    </div>
                    }
                </div>
            </nav>
        </>
     );
}

export default Navbar;
