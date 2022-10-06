import React, { useEffect, useRef, useState } from 'react'
import agent from '../../app/api/agent'
import { Category } from '../../app/models/category'
//jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from "jquery"
export default function CategoryList() {
  const [categories, setCategories] = useState<Category[] | null>(null)
  const tableRef = useRef<any>(null)
  const $dt: JQuery & { DataTable?: any } = $(tableRef.current);
  useEffect(() => {


    agent.Catalog.categoryList().then(response => {
      $dt.DataTable();
      setCategories(response)


    })
  }, [$dt])

  if (!categories) return <div>Loading....</div>


  return (
    <div>
      <table ref={tableRef} >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => {
            return (

              <tr key={c.categoryId}>
                <td>{c.categoryId}</td>
                <td>{c.categoryName}</td>
              </tr>
            )
          })}


        </tbody>
      </table>

      {/* {categories.map(c => <img src={`data:image/jpeg;base64,${c.picture}`} />)} */}
    </div>
  )
}
