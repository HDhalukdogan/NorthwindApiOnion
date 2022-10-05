import useProducts from '../../app/hooks/useProducts';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setProductParams } from './catalogSlice';

export default function Catalog() {
  const { products, productsLoaded, categoriesLoaded, categories, suppliersLoaded, suppliers, productParams } = useProducts();
  const dispatch = useAppDispatch();


  return (
    <div>
      <h1>Products</h1>
      {productsLoaded ? products.map(product => <p key={product.productId}>{product.productName}</p>) : <div>Loading...</div>}
      <h1>Suppliers</h1>
      {suppliersLoaded ? suppliers.map(supp => <p key={supp.supplierId} onClick={()=>dispatch(setProductParams({supplierId:supp.supplierId}))}>{supp.companyName}</p>) : <div>Loading...</div>}
      <h1>Categories</h1>
      {categoriesLoaded ? categories.map(cat => <p key={cat.categoryId} onClick={()=>dispatch(setProductParams({categoryId:cat.categoryId}))}>{cat.categoryName}</p>) : <div>Loading...</div>}
    </div>
  )
}
