import React, { useEffect, useState } from 'react'
import agent from '../../app/api/agent'
import { Category } from '../../app/models/category'

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]|null>(null)
    useEffect(() => {
        agent.Catalog.categoryList().then(response => setCategories(response))
    }, [])
    
if(!categories) return <div>Loading....</div>


  return (
    <div>
        {categories.map(c => <img src={`data:image/jpeg;base64,${c.picture}`} /> )}
    </div>
  )
}
