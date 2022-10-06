import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Category } from "../../app/models/category";
import { Pagination } from "../../app/models/pagination";
import { Product, ProductParams } from "../../app/models/product";
import { Supplier } from "../../app/models/supplier";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
    productsLoaded: boolean;
    categoriesLoaded: boolean;
    suppliersLoaded: boolean;
    status: string;
    categories: Category[];
    suppliers: Supplier[];
    productParams: ProductParams;
    pagination: Pagination | null;
}

const productsAdapter = createEntityAdapter<Product>({
    selectId: p => p.productId
});


function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    if (productParams.orderBy) params.append('orderBy', productParams.orderBy);
    if (productParams.search) params.append('search', productParams.search);
    if (productParams.categoryId) params.append('categoryId', productParams.categoryId.toString());
    if (productParams.supplierId) params.append('supplierId', productParams.supplierId.toString());
    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams)
        try {
            const response = await agent.Catalog.productList(params);
            thunkAPI.dispatch(setPagination(response.pagination));
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.productDetails(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchCategoriesAsync = createAsyncThunk<Category[], void, {state: RootState}>(
    'catalog/fetchCategoriesAsync',
    async (_, thunkAPI) => {
        try {
            const response = await agent.Catalog.categoryList();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)
export const fetchSuppliersAsync = createAsyncThunk<Supplier[], void, {state: RootState}>(
    'catalog/fetchSuppliersAsync',
    async (_, thunkAPI) => {
        try {
            const response = await agent.Catalog.supplierList();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 9,
        orderBy: 'name',
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        categoriesLoaded: false,
        suppliersLoaded: false,
        status: 'idle',
        categories: [],
        suppliers: [],
        productParams: initParams(),
        pagination: null
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload, pageNumber: 1 };
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload };
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
        resetProductParams: (state) => {
            state.productsLoaded = false;
            state.productParams = initParams();
        },
        setProduct: (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.productsLoaded = false;
        },
        removeProduct: (state, action) => {
            productsAdapter.removeOne(state, action.payload);
            state.productsLoaded = false;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        })
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        })
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
        builder.addCase(fetchCategoriesAsync.pending, (state) => {
            state.status = 'pendingFetchCategories';
        })
        builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.status = 'idle';
            state.categoriesLoaded = true;
        });
        builder.addCase(fetchCategoriesAsync.rejected, (state, action) => {
            state.status = 'idle';
        });
        builder.addCase(fetchSuppliersAsync.pending, (state) => {
            state.status = 'pendingFetchSuppliers';
        })
        builder.addCase(fetchSuppliersAsync.fulfilled, (state, action) => {
            state.suppliers = action.payload;
            state.status = 'idle';
            state.suppliersLoaded = true;
        });
        builder.addCase(fetchSuppliersAsync.rejected, (state, action) => {
            state.status = 'idle';
        });
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);
export const {setProductParams, resetProductParams, setPagination, setPageNumber, setProduct, removeProduct} = catalogSlice.actions;