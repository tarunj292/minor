import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';

const Form = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        seat: '',
        minor: ''
    });

    const [alertMessage, setAlertMessage] = useState('')
    const [severity, setSeverity] = useState('')
    const [alertOpen, setAlertOpen] = useState(false)

    const SimpleAlert = (alertMsg, paraSeverity) => {
        setAlertMessage(alertMsg)
        setSeverity(paraSeverity)
        setAlertOpen(true)
    }

    function handleAlertClose() {
        setAlertOpen(false)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        const regex = /^[a-zA-Z0-9._%+-]+@somaiya\.edu$/;
        if (regex.test(formData.email)) {
            console.log("Right")
            SimpleAlert(`Successfully Enrolled in ${formData.minor} course.`, "success")
        } else {
            console.error("Error")
            SimpleAlert("Enter somaiya id", "error")
        }
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <>
            <h1 style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2vh",
                fontWeight: 600,
                textAlign: "center",
                marginTop: "3vh"
            }}>
                Welcome to Somaiya Minor Selection Form
            </h1>
            <div style={{
                display: "flex",
                justifyContent: "left"
            }}>
                <form style={{ margin: "3vh", marginLeft: "2vw", width: "200vw" }} onSubmit={handleSubmit}>
                    <label htmlFor="email" className="form-label">Enter your Email:</label>
                    <input
                        id="email"
                        name="email"
                        className="form-control"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ marginBottom: "3vh" }}
                        placeholder="Somaiya Email"
                        required
                    />

                    <label htmlFor="name" className="form-label">Enter your Name:</label>
                    <input id="name" name="name" className="form-control" type="text" value={formData.name} onChange={handleChange} style={{ marginBottom: "3vh" }} placeholder="Enter Name" required />

                    <label htmlFor="seat" className="form-label">Enter your Seat Number:</label>
                    <input id="seat" name="seat" className="form-control" type="text" value={formData.seat} onChange={handleChange} style={{ marginBottom: "3vh" }} placeholder="Enter Seat Number" required />

                    <label htmlFor="minorCourse" className="form-label">Select your Course:</label>
                    <Box sx={{ minWidth: 120, marginBottom: "5vh" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Course</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="minorCourse"
                                value={formData.minor}
                                label="Courses"
                                name="minor"
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value={"UI / UX"}>UI/UX</MenuItem>
                                <MenuItem value={"Finance"}>Finance</MenuItem>
                                <MenuItem value={"BMS"}>BMS</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>


                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <Dialog open={alertOpen} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity={severity}>
                        {alertMessage}
                    </Alert>
                </Dialog>
            </div>
        </>
    );
};

export default Form;
