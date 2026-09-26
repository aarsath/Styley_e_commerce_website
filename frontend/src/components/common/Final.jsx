const Final = () => {
    return (
        <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center  px-5 py-12">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
                Purchase successfully completed
            </h1>
            <img
                src="/order-confirmed.svg"
                alt="Order Confirmed"
                className="h-auto w-full max-w-xs"
            />
        </div>
    );
};

export default Final;
