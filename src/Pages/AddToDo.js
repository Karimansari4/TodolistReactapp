import { Button, Snackbar, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import MuiAlert from '@mui/material/Alert';


// MUI alert with custom alert
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function AddToDo() {
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

    // handle date changes on input
    const handleChangeData = (evt) => {
        setToDos({
            ...toDos,
            dueDate: moment(evt.$d).format('DD/MM/YYYY')
        })
        
        setErrHandle({
        })
    };

    // handle input change
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

    // adding data to fake json server
    const addToDo = async(evt) => {
        evt.preventDefault()
        
        if(!toDos.description){
            setErrHandle({
                des: 'Please enter description of ToDo!'
            })
        }else if(!toDos.category){
            setErrHandle({
                category: 'Please enter category of ToDo!'
            })
        }else{
            
            return await axios.post(`https://my-json-server.typicode.com/Karimansari4/TodolistReactapp/posts`, toDos).then((response) => {
                setSuccess("ToDo added successfully.")
                setCustomVariant('success')
                setOpen(true)
                setToDos({
                    description: '',
                    category: '',
                })
            }).catch((err) => {
                setError("Failed to Add ToDo")
                setCustomVariant('error')
                setOpen(true)
                console.log("error: ", err);
            })
        }
    }

    return (
        <Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={customVariant} sx={{ width: '100%' }}>
                  {success ? success : error}
              </Alert>
            </Snackbar>
            <Box sx={{flexGrow: 1}}>
                <center><Typography variant='h5' component={'h'}>Add ToDo</Typography></center>
                <form encType='multipart/form-data'>
                    <Box >
                        <TextField error={errHandle.category ? true : false} helperText={errHandle.category ? errHandle.category : ''} id="standard-textarea" label="Category" name="category" value={toDos.category} onChange={handleChange}  placeholder="Category of ToDo" variant="standard" required fullWidth sx={{ marginTop: '20px'}}/>

                        <TextField error={errHandle.des ? true : false} helperText={errHandle.des ? errHandle.des : ''} id="standard-textarea" label="Description" name="description" value={toDos.description} onChange={handleChange}  placeholder="Description of ToDo" variant="standard" required fullWidth sx={{ marginTop: '20px'}}/>
                    </Box>
                    <Button variant='contained' color='success' onClick={addToDo} sx={{ mt: 3}} fullWidth>Add</Button>
                </form>
            </Box>
        </Container>
    )
}

export default AddToDo