import React, { useState } from 'react'
import PageContainer from '../components/HOC/PageContainer'
import { Paper, Typography, TextField, Button, Box, Grid } from '@mui/material'
import { checkStatus } from '../apis/Service';
import { clearCheckAuth, setCheckAuthenticated, setCheckDetails } from '../apis/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PopUp() {
    const [employeeId, setEmployeeId] = useState("");
    const {
        username,
        email,
        contactNumber,
        employeeID,
        assetName,
        department,
        roleinRTMS,
        idCardPhoto,
        passportPhoto,
    } = useSelector((state) => state.checkAuth); // Get username and password from Redux store
    const dispatch = useDispatch(); // Get the dispatch function
    const navigate = useNavigate(); // Get the navigate function

    const handleInputChange = (e) => {
        setEmployeeId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            username,
            email,
            contactNumber,
            employeeID: employeeId,
            assetName, department,
            roleinRTMS,
            idCardPhoto,
            passportPhoto,
        };
        console.log("Form Data: ", formData);
        
        try {
            const response = await checkStatus(formData); // Verify OTP
            if (response.success) {
                dispatch(setCheckDetails(employeeId)); // Store OTP in Redux
                dispatch(setCheckAuthenticated(true)); // Set authenticated state to true
                toast.success("You are now on the check status!");

                navigate("/CheckStatus");

                dispatch(clearCheckAuth()); // Clear auth data after login success
            } else {
                toast.error("EmployeeId does not match.");
            }
        } catch (error) {
            console.error(error);
            toast.error("EmployeeId verification failed.");
        }
    };

    return (
        <PageContainer
            showheader
            showfooter
            display="flex" alignItems='center' className='bgImg' >
            <Grid container justifyContent='center' >
                <Paper sx={{ borderRadius: '20px' }}>
                    <Grid item p={3} >
                        <form onSubmit={handleSubmit}>
                            <Box item mt={2}>
                                <Typography variant='h5' fontSize='x-large' textAlign="center">Enter Employee ID.</Typography>
                            </Box>

                            <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
                                <TextField justifyContent="center" label="Enter Employee ID" name='employeeId' value={employeeId} onChange={handleInputChange} variant="outlined" size='medium' fullWidth />
                            </Box>
                            <Box mt={3} sx={{ display: "flex", justifyContent: "center" }} >
                                <Button variant='contained' color='primary' fullWidth size='medium' type='submit'>Check Status</Button>
                            </Box>
                            {/* <Grid item mt={2} textAlign='center'>
                                <Link to="/" style={{ textDecoration: "none" }}>Back to SignUp</Link>
                            </Grid> */}
                        </form>
                    </Grid>
                </Paper>
            </Grid>
        </PageContainer>
    )
}

export default PopUp