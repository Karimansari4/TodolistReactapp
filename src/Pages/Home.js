import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, IconButton, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Home() {
    // states to store data in frantend side
    const [toDos, setToDos] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState('')
    const [open, setOpen] = useState(false);
    const [customVariant, setCustomVariant] = useState('success')
    const [refresh, setRefresh] = useState(false)

    // this is fetch all the data from database
    const fetchToDos = async() =>{
        return await axios.get(`http://localhost:4000/posts`).then((response) => {
            setToDos(response.data)
            setLoading(false)
        // console.log("data: ", response.data.result);
        }).catch((err) => {
            setError("error while fetching data?")
            setCustomVariant("error")
            setOpen(true)
            setLoading(false)
        })
    }

     // useEffect to update UI components or call get api while loading or changing the UI
    useEffect(() => {
        fetchToDos()

    }, [refresh])

    // this is for Toast of MUI close function
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    // task delete function
    const deleteToDos = async(id) => {
        return axios.delete(`http://localhost:4000/posts/${id}`).then((response) => {
            setCustomVariant('success')
            setSuccess("ToDo deleted successfully.")
            setOpen(true)
            if(refresh){
                setRefresh(false)
            }else{
                setRefresh(true)
            }
            setError('')
        }).catch((err) => {
            setError("Failed to delete ToDo?")
            console.log("error: ", err)
            setCustomVariant('error')
            setOpen(true)
            setSuccess('')
        })
    }

    // console.log("todos: ", toDos);

    return (
        <Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={customVariant} sx={{ width: '100%' }}>
                    {success ? success : error}
                </Alert>
            </Snackbar>
            <Box sx={{ flexGrow: 1, mt: 2}}>
                <Table>
                <TableHead>
                    <TableRow style={{ backgroundColor: 'lightgrey',}}>
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {loading ? <Typography variant='h5' component={'p'} sx={{ textAlign: 'center'}}>Loading...</Typography> : toDos ? toDos.map((item, ind) => {
                    return (
                        <TableRow key={ind}>
                        
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{moment(item.createdAt).format('DD/MM/YYYY')}</TableCell>
                        <TableCell> <Link to={`/update/${item.id}`} ><IconButton ><EditIcon sx={{color: '#a7b90a;'}} /> </IconButton></Link> </TableCell>
                        <TableCell><IconButton onClick={() => deleteToDos(item.id)}><DeleteForeverIcon sx={{color: 'red'}} /> </IconButton> </TableCell>
                        </TableRow>
                    )
                    }) : <Typography variant='h5' component={'p'} sx={{ textAlign: 'center'}}>No Data Found</Typography>}
                </TableBody>
                </Table>
            </Box>
    </Container>
    )
}

export default Home