import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeAuthenticatedRequest } from '../service/axiosService';

export const createProduct = createAsyncThunk(('product/create'), async({productImage, formData}, { rejectWithValue }) => {
    try {
  if (!productImage) {
    throw new Error('Please choose a product image')
  }
    const requestData = new FormData()
    requestData.append('title', formData.title)
    requestData.append('description', formData.description)
    requestData.append('price', formData.price)
    requestData.append('image', productImage)
    const response = await makeAuthenticatedRequest('api/product/create', 'POST', requestData)

        return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Product upload failed')
    }
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    loading: false,
    productData: {},
    status: null,
    error: null
  },
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.pending, (state) => {
        state.loading = true,
        state.productData = null,
        state.error = null
        state.message = null
    })
    .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false,
        state.productData = action.payload,
        state.error = null,
        state.status = "Success"
    })
    .addCase(createProduct.rejected, (state, action) => {
        state.loading = false,
        state.productData =null,
        state.error = action.payload || action.error.message,
        state.status = "Error"
    })
  }
});

export default productSlice.reducer;
