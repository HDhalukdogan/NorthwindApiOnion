import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductAsync, productSelectors } from './catalogSlice';


export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => productSelectors.selectById(state, id!));
    const { status } = useAppSelector(state => state.catalog);

    useEffect(() => {
        if (!product) dispatch(fetchProductAsync(parseInt(id!)));
    }, [dispatch, product,id])


    if (status.includes('pending')) return <LoadingComponent message='Loading Product...' />

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography variant='h3'>{product?.productName}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'>{product?.unitPrice}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product?.productName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product?.productName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product?.categoryName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product?.supplierName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product?.unitsInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
