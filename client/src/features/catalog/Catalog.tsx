import useProducts from '../../app/hooks/useProducts';
import { useAppDispatch } from '../../app/store/configureStore';
import { setProductParams, setPageNumber, resetProductParams } from './catalogSlice';
import { debounce, Grid, Paper, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Box, Typography, Pagination } from "@mui/material";
import { useState } from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import ProductList from './ProductList';
import { LoadingButton } from '@material-ui/lab';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' }
]


export default function Catalog() {
  const { products, productsLoaded, categoriesLoaded, categories, suppliersLoaded, suppliers, productParams, pagination } = useProducts();
  const [searchTerm, setSearchTerm] = useState(productParams.search)
  const dispatch = useAppDispatch();
  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ search: event.target.value }))
  }, 1000)
  const [pNumber, setPNumber] = useState(pagination?.currentPage)
  function handlePageChange(page: number) {
    setPNumber(page);
    dispatch(setPageNumber({ pageNumber: page }))
  }
  if (!productsLoaded || !categoriesLoaded || !suppliersLoaded) return <LoadingComponent message='Loading product...' />

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <TextField
            label='Search products'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}
            onChange={(event: any) => {
              setSearchTerm(event.target.value);
              debouncedSearch(event);
            }}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl component="fieldset">
            <RadioGroup onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))} value={productParams.orderBy}>
              {sortOptions.map(({ value, label }) => (
                <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl component="fieldset">
            <RadioGroup
              onChange={(e) => dispatch(setProductParams({ categoryId: e.target.value === '0' ? null : e.target.value }))}
              value={productParams.categoryId === undefined || productParams.categoryId === null ? '0' : productParams.categoryId}
            >
              <FormControlLabel value='0' control={<Radio />} label='All' key='0' />
              {categories.map(({ categoryId, categoryName }) => (
                <FormControlLabel value={categoryId} control={<Radio />} label={categoryName} key={categoryId} />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl component="fieldset">
            <RadioGroup
              onChange={(e) => dispatch(setProductParams({ supplierId: e.target.value === '0' ? null : e.target.value }))}
              value={productParams.supplierId === undefined || productParams.supplierId === null ? '0' : productParams.supplierId}
            >
              <FormControlLabel value='0' control={<Radio />} label='All' key='0' />
              {suppliers.map(({ supplierId, companyName }) => (
                <FormControlLabel value={supplierId} control={<Radio />} label={companyName} key={supplierId} />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
      </Grid>
      <Grid item xs={9}>

        <ProductList products={products} />
        {pagination && <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography>
            Displaying {(pagination.currentPage - 1) * pagination.pageSize + 1}-
            {pagination.currentPage * pagination.pageSize > pagination.totalCount
              ? pagination.totalCount
              : pagination.currentPage * pagination.pageSize} of {pagination.totalCount} items
          </Typography>
          <Pagination
            color='secondary'
            size='large'
            count={pagination?.totalPages}
            page={pNumber}
            onChange={(e, page) => handlePageChange(page)}
          />
        </Box>}
        <LoadingButton onClick={()=> dispatch(resetProductParams())}>Reset</LoadingButton>
      </Grid>
      
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 2 }}>
      </Grid>
    </Grid>
  )
}
