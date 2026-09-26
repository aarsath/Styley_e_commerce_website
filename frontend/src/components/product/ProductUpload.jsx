// src/components/Modal.js
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../store/productStore';

const ProductUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imagePath: null,
  });
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [successFlag, setSuccessFlag] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.product)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setSuccessFlag(false)
    setMessage(null)

    try {
      await dispatch(createProduct({productImage, formData})).unwrap()
      setSuccessFlag(true)
      setMessage('Product uploaded successfully')
      setFormData({ title: '', description: '', price: '', imagePath: null })
      setProductImage(null)
      setPreviewImage(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      console.error(err)
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-2 py-5 sm:px-3 sm:py-6 lg:px-4">
      <section className="mx-auto w-[92%] max-w-[1100px] overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
        <div className="border-b border-slate-200 bg-slate-900 px-6 py-5 text-white sm:px-8 sm:py-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Seller studio</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Add a new product</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Create a polished listing with clear details and a strong product image.</p>
        </div>

        <form className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:gap-8" onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
          <div className="space-y-5">
            {successFlag && <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{message}</div>}
            {error && <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{typeof error === 'string' ? error : 'Product upload failed'}</div>}

            <div>
              <label htmlFor="title" className="text-sm font-semibold text-slate-700">Product title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Classic cotton kurta" required className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" />
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-semibold text-slate-700">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe the fit, fabric, color, and other useful details" required rows="4" className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" />
            </div>

            <div>
              <label htmlFor="price" className="text-sm font-semibold text-slate-700">Price</label>
              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} placeholder="0" min="1" required className="w-full rounded-lg border border-slate-300 py-3 pl-9 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" />
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200 sm:p-6">
            <div>
              <label htmlFor="image" className="text-sm font-semibold text-slate-700">Product image</label>
              <p className="mt-1 text-xs text-slate-500">Use a clear JPG, PNG, or WEBP image.</p>
              <input ref={fileInputRef} type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} required={!productImage} className="mt-4 block w-full cursor-pointer rounded-lg border border-slate-300 bg-white text-sm text-slate-600 file:mr-4 file:border-0 file:bg-cyan-600 file:px-4 file:py-3 file:font-semibold file:text-white hover:file:bg-cyan-700" />
            </div>

            <div className="mt-4 flex h-48 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-white p-3 sm:h-52">
              {previewImage ? <img src={previewImage} alt="Product preview" className="h-full w-full rounded-lg object-contain" /> : <div className="text-center text-slate-400"><p className="text-4xl">+</p><p className="mt-2 text-sm font-medium">Your image preview appears here</p></div>}
            </div>

            <button type="submit" disabled={loading} className="mt-6 w-full rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? 'Uploading product...' : 'Upload product'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ProductUpload;
