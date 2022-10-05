import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { productSelectors, fetchProductsAsync, fetchCategoriesAsync, fetchSuppliersAsync } from "../../features/catalog/catalogSlice";


export default function useProducts() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, categoriesLoaded,suppliersLoaded, categories, suppliers, pagination,productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])
    useEffect(() => {
        if (!categoriesLoaded) dispatch(fetchCategoriesAsync());
    }, [dispatch, categoriesLoaded])
    useEffect(() => {
        if (!suppliersLoaded) dispatch(fetchSuppliersAsync());
    }, [dispatch, suppliersLoaded])
    return {
        products,
        productsLoaded,
        categoriesLoaded,
        suppliersLoaded,
        categories,
        suppliers,
        pagination,
        productParams
    }
}