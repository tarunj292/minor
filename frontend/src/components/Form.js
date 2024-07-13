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
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter your Email:</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} />
                <br />
                <label htmlFor="name">Enter your Name:</label>
                <input name="name" type="text" value={formData.name} onChange={handleChange} />
                <br />
                <label htmlFor="seat">Enter your Seat Number:</label>
                <input name="seat" type="text" value={formData.seat} onChange={handleChange} />
                <br />

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Courses</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.minor}
                            label="Courses"
                            name="minor"
                            onChange={handleChange}
                        >
                            <MenuItem value={"UI / UX"}>UI/UX</MenuItem>
                            <MenuItem value={"Finance"}>Finance</MenuItem>
                            <MenuItem value={"BMS"}>BMS</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <br />
                <button type="submit">Submit</button>
            </form>
            <Dialog open={alertOpen} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={severity}>
                    {alertMessage}
                </Alert>
            </Dialog>
        </>
    );
};

export default Form;
