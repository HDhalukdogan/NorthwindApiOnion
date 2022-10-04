import React, { useEffect, useState } from 'react'
import agent from '../../app/api/agent'
import { Product } from '../../app/models/product'

export default function Catalog() {

  const [products, setProducts] = useState<Product[] | null >(null)

  useEffect(() => {
    //agent.Catalog.productList().then(response => setProducts(response.value))
  }, [])
  
  return (
    <div>
      {products ? products?.map(product => <p key={product.productId}>{product.productName}</p>): <div>Loading...</div>}
    </div>
  )
}
