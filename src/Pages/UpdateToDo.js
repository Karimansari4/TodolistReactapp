import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Container } from '@mui/system'
import { Button, Snackbar, TextField, Typography, Slide, IconButton  } from '@mui/material'
import moment from 'moment'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateToDo() {

    // params to get id from previous page (react-router-dom)
    const {id} = useParams()
    const navigate = useNavigate()

    // states
    const [toDos, setToDos] = useState({
        description: '',
        category: '',
    })
    const [errHandle, setErrHandle] = useState({
        des: '',
        category: '',
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [open, setOpen] = useState(false);
    const [customVariant, setCustomVariant] = React.useState('success')
    

    // fetching single data by id
    const fetchById = async() => {   
        return await axios.get(`http://localhost:4000/posts/${id}`).then((response) => {
            setToDos(response.data)
            // console.log("response: ", response.data.result);
        }).catch((err) => {
            console.log("error: ", err.response);
        })
    }

    // input onChange event
    const handleChange = (evt) => {
        setToDos({
            ...toDos,
            [evt.target.name]: evt.target.value
        })
        setErrHandle({
            des: '', 
            category: '',
        })
    }

    // closing alert
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }

    // update todo
    const addToDo = async(evt) => {
        evt.preventDefault()
        if(!toDos.description){
            setErrHandle({
                des: 'Please enter description of ToDo'
            })
        }else if(!toDos.category){
            setErrHandle({
                category: 'Please enter category of ToDo'
            })
        }else{
            return await axios.put(`http://localhost:4000/posts/${id}`, toDos).then((response) => {
                setSuccess("Update Successfully.")
                // console.log("success: ", response);
                setCustomVariant('success')
                setOpen(true)
                navigate('/')
            }).catch((err) => {
                setError("Faild to update?")
                setCustomVariant('error')
                setOpen(true)
                console.log("error: ", err.response);
            })
        }
    }

    
    // useEffect which run on component load
    useEffect(() => {
        fetchById()
    }, [])

    return (
        <Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={customVariant} sx={{ width: '100%' }}>
                  {success ? success : error}
              </Alert>
            </Snackbar>
            <Box sx={{flexGrow: 1}}>
                <center><Typography variant='h5' component={'p'}>Add ToDo</Typography></center>
                <form encType='multipart/form-data'>
                    <Box >
                        <TextField error={errHandle.category ? true : false} helperText={errHandle.category ? errHandle.category : ''} id="standard-textarea" label="Category" name="category" value={toDos.category} onChange={handleChange}  placeholder="Category of ToDo" variant="standard" required fullWidth sx={{ marginTop: '20px'}}/>

                        <TextField error={errHandle.des ? true : false} helperText={errHandle.des ? errHandle.des : ''} id="standard-textarea" label="Description" name="description" value={toDos.description} onChange={handleChange}  placeholder="Description of ToDo" variant="standard" required fullWidth sx={{ marginTop: '20px'}}/>
                    </Box>
                    <Button variant='contained' color='success' onClick={addToDo} sx={{ mt: 3}}>Add</Button>
                </form>
            </Box>
        </Container>
    )
}

export default UpdateToDo