import { ShoppingCart } from '@mui/icons-material'
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography, Box } from '@mui/material'
import { NavLink, Link } from 'react-router-dom'
import { useAppSelector } from '../store/configureStore'
import SignedInMenu from "./SignedInMenu";



const midLinks = [
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
]
const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header() {
    const { user } = useAppSelector(state => state.account);
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <NavLink
                        to='/'
                        style={navStyles}
                    >
                        HOME
                    </NavLink>
                </Box>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                    <ListItem
                        component={NavLink}
                        to={'/product'}
                        sx={navStyles}
                    >
                        INVENTORY
                    </ListItem>
                    {user && user.roles?.includes('admin') &&
                        <ListItem
                            component={NavLink}
                            to={'/roles'}
                            sx={navStyles}
                        >
                            ROLES
                        </ListItem>}
                    {user && user.roles?.includes('admin') &&
                        <ListItem
                            component={NavLink}
                            to={'/users'}
                            sx={navStyles}
                        >
                            USERS
                        </ListItem>}
                </List>
                <Box display='flex' alignItems='center'>
                    {user ? (
                        <SignedInMenu />
                    ) : (
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>


            </Toolbar>
        </AppBar>
    )
}

