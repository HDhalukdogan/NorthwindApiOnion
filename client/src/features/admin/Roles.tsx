import React, { useEffect, useState } from 'react'
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Input } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import agent from '../../app/api/agent'
import { RoleModel } from '../../app/models/rolesWithUsers';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Roles() {
    const [roles, setRoles] = useState<RoleModel[] | null>(null);
    const [role, setRole] = useState<RoleModel | null>(null);
    const [open, setOpen] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [term, setTerm] = useState('');
    const handleOpen = (role: RoleModel) => {
        setRole(role);
        setOpen(true);
    }
    const handleClose = () => {
        setRole(null);
        setOpen(false);
    }
    const handleCloseCreate = () =>{
        setTerm('');
        agent.Admin.createRole(term);
        setOpenCreate(false)
    }
    useEffect(() => {
        agent.Admin.roles().then(response => setRoles(response)).catch(error => console.log(error));
    },[open,openCreate])
    if (!roles) {
        return <h1>Roles can not fetched</h1>
    }
    return (
        <>
            <Button onClick={() => setOpenCreate(true)}>Create New Role</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>#</TableCell>
                            <TableCell align="center">Role Name</TableCell>
                            <TableCell align="center">Role Users</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles?.map((role, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{role.role}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => handleOpen(role)}>View</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Role Name: {role?.role}
                    </Typography>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {role?.users.map(user =>
                            <ListItem key={user}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user} />
                                <DeleteForeverIcon onClick={() => agent.Admin.removeUserFromRoles(user, role.role).then(() => handleClose())} />
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Modal>


            <Modal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create new Role
                    </Typography>
                    <Input type='text' placeholder='Role' value={term} onChange={(e) => setTerm(e.target.value)} />
                    <Button onClick={handleCloseCreate} >Create New</Button>
                    <Button onClick={() => setOpenCreate(false)}>Cancel</Button>

                </Box>
            </Modal>

        </>
    )
}
