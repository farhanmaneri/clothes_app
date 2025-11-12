import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = process.env.REACT_APP_API_URL;
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    uploadProduct: builder.mutation({
      query: (formData) => ({
        url: "/products/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUploadProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiSlice;
