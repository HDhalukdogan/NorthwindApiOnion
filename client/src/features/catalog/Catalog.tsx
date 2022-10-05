import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchCategoriesAsync, fetchProductsAsync, fetchSuppliersAsync, productSelectors } from './catalogSlice';

export default function Catalog() {
  const { productsLoaded, categoriesLoaded, categories, suppliersLoaded, suppliers } = useAppSelector(state => state.catalog);
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
    if (!categoriesLoaded) dispatch(fetchCategoriesAsync());
    if (!suppliersLoaded) dispatch(fetchSuppliersAsync());
  }, [productsLoaded, categoriesLoaded, suppliersLoaded, dispatch])

  return (
    <div>
      <h1>Products</h1>
      {productsLoaded ? products.map(product => <p key={product.productId}>{product.productName}</p>) : <div>Loading...</div>}
      <h1>Suppliers</h1>
      { suppliersLoaded? suppliers.map(supp => <p key={supp.supplierId}>{supp.companyName}</p>) : <div>Loading...</div>}
      <h1>Categories</h1>
      {categoriesLoaded ? categories.map(cat => <p key={cat.categoryId}>{cat.categoryName}</p>) : <div>Loading...</div>}
    </div>
  )
}
