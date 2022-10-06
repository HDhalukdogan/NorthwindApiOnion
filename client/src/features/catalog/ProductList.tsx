import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Product } from '../../app/models/product'

interface Props {
    products: Product[]
}

export default function ProductList({ products }: Props) {
    return (
        <Grid container spacing={4}>
            {products.map((product) => (
                <Grid item xs={4} key={product.productId}>
                    <h1>{product.productName}</h1>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                    {product.productName.charAt(0).toUpperCase()}
                                </Avatar>
                            }
                            title={product.productName}
                            titleTypographyProps={{
                                sx: { fontWeight: 'bold', color: 'primary.main' }
                            }}
                        />
                        {/* <CardMedia
                            sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                            title={product.productName}
                        /> */}
                        <CardContent>
                            <Typography gutterBottom color='secondary' variant="h5">
                                {product.unitPrice}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.categoryName} / {product.supplierName}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button component={Link} to={`/product/${product.productId}`} size="small">View</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
