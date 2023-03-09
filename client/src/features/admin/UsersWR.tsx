import React, { useEffect, useState } from 'react'
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, FormControlLabel } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import agent from '../../app/api/agent'
import { UserWithRoles } from '../../app/models/usersWithRoles';
import { Checkbox } from "@material-ui/core";
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@material-ui/lab';

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

export default function UsersWR() {
    const [users, setUsers] = useState<UserWithRoles[] | null>(null);
    const [user, setUser] = useState<UserWithRoles | null>(null)
    const [roles, setRoles] = useState<string[] | null>(null);
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid }, reset } = useForm({
        mode: 'all',
        defaultValues: {
            checkbox: []
        }
    });


    const handleOpen = (user: UserWithRoles) => {
        setUser(user);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setUser(null);
    }
    useEffect(() => {
        agent.Admin.usersWithRoles().then(response => setUsers(response)).catch(error => console.log(error));
        agent.Admin.roles().then(response => setRoles(response)).catch(error => console.log(error));
    }, [user])

    const submitForm = (data: FieldValues) => {
        console.log('data', data)
        // let newData = Object.entries(data).filter(s => s[1] === true).map(r => r[0])

        // agent.Admin.editRoles(user!.username, newData).then(() => {
        //     handleClose();
        //     reset()
        // })
        agent.Admin.editRoles(user!.username, data.checkbox).then(() => {
            handleClose();
            reset()
        })
    }

    if (!users) {
        return <h1>Users can not fetched</h1>
    }
    return (
        <>
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
                        {users?.map((user, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{user.username}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => handleOpen(user)}>View</Button>
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
                <Box component="form" onSubmit={handleSubmit(submitForm)} sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        User Name: {user?.username}
                    </Typography>
                    {/* <List component="form" onSubmit={handleSubmit(submitForm)} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {roles?.map(role =>
                            <ListItem key={role}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={role} />
                                {user?.roles.some(r => r === role) ?
                                    <Checkbox {...register(role)} defaultChecked /> :
                                    <Checkbox {...register(role)} />}
                            </ListItem>
                        )}
                        <LoadingButton
                            loading={isSubmitting}
                            disabled={!isValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Edit
                        </LoadingButton>
                    </List> */}
                    {/* {roles?.map(role => <FormControlLabel
                        key={role}
                        label={role}
                        {...register(role)}
                        control={<Checkbox defaultChecked={user?.roles.includes(role)} />}
                    />)} */}
                    {roles?.map(role => <FormControlLabel
                        key={role}
                        label={role}
                        control={<Checkbox defaultChecked={user?.roles.includes(role)} value={role} {...register("checkbox")} />}
                    />)}
                    <LoadingButton
                        loading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Edit
                    </LoadingButton>
                </Box>
            </Modal>

        </>
    )
}
