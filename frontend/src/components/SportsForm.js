import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import { createStudent2, getAllPrograms, getAllSports, getCapacityBySport } from '../actions/studentAction';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        memberID: '',
        seatNum: '',
        program: '',
        phoneNum: '',
        sport: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        memberID: '',
        seatNum: '',
        phoneNum: ''
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [cap, setCap] = useState();
    const [sportsList, setSportsList] = useState([])
    const [programMenuEl, setProgramMenuEl] = useState([]);

    useEffect(() => { fetchCapacity() }, [formData.sport])
    useEffect(() => { setErrors(validateDetails()) }, [formData])
    useEffect(() => {
        fetchProgramData()
        fetchSports()
    }, [])

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
        let error = true
        let msg
        for (const [, value] of Object.entries(errors)) {
            if (value.length > 0) {
                error = false;
                msg = value;
                break;
            }
        }
        if (cap > 0 && error) {
            const data = {
                name: formData.name,
                email: formData.email,
                seatno: formData.seatNum,
                mobileno: formData.phoneNum,
                memberid: formData.memberID,
                programName: formData.program,
                sport: formData.sport,
            };

            createStudent2(JSON.stringify(data)).then(res => {
                if (res.success) {
                    setCap(prevCap => prevCap - 1)
                    setFormData({
                        name: '',
                        email: '',
                        memberID: '',
                        seatNum: '',
                        program: '',
                        phoneNum: '',
                        sport: ''
                    });
                    setCap(null)
                    SimpleAlert(`Successfully Enrolled in ${formData.sport} course.`, "success");
                } else {
                    SimpleAlert(res.message, "error");
                }
            }
            )
        } else {
            SimpleAlert(("Type" + msg.slice(15, msg.length)), "error");
        }
        event.preventDefault();
    }

    const fetchCapacity = async () => {
        try {
            const res = await getCapacityBySport(formData.program, formData.sport);
            setCap(res.remainingCapacity);
        } catch (err) {
            console.error('error getting sports', err);
        }
    }

    const fetchSports = async () => {
        try {
            const res = await getAllSports();
            const sportsList = res.sports.map(item => item.name);
            setSportsList(sportsList);
        } catch (err) {
            console.error('error getting sports', err);
        }
    }

    const fetchProgramData = async () => {
        try {
            const res = await getAllPrograms();
            const programList = res.data.map(item => ({
                value: item.progName,
                label: item.progName  // Assuming progName is both value and label
            }));
            setProgramMenuEl(programList);
        } catch (error) {
            console.error(error);
        }
    };

    const validateDetails = () => {
        let errors = {
            name: '',
            email: '',
            memberID: '',
            seatNum: '',
            phoneNum: ''
        }
        if (formData.name.length > 0) {
            const nameRegex = /^[A-Za-z\s]+$/;
            if (!nameRegex.test(formData.name)) {
                errors.name = "❗Are you typing your name correctly?"
            }
        }
        if (formData.email.length > 0) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@somaiya\.edu$/;
            if (!emailRegex.test(formData.email)) {
                errors.email = "❗Are you typing your somaiya email correctly?"
            }
        }
        if (formData.memberID.length > 0) {
            const memberIDRegex = /^\d{10}$/;
            if (!memberIDRegex.test(formData.memberID))
                errors.memberID = "❗Are you typing your member ID correctly?"
        }
        if (formData.seatNum.length > 0) {
            const seatNumRegex = /^\d{11}$/;
            if (!seatNumRegex.test(formData.seatNum))
                errors.seatNum = "❗Are you typing your seat number correctly?"
        }

        if (formData.phoneNum.length > 0) {
            const phoneNumRegex = /^\d{10}$/;
            if (!phoneNumRegex.test(formData.phoneNum))
                errors.phoneNum = "❗Are you typing your phone number correctly?"
        }

        return errors
    }

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
                justifyContent: "center"
            }}>
                <form className="col-md-6 col-10" onSubmit={handleSubmit}>

                    <label htmlFor="name" className="form-label">Enter your Name:</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                            marginBottom: "3vh",
                            border: errors.name ? '3px solid red' : '1px solid #ced4da',
                            boxShadow: errors.name ? '0 0 0 0.2rem rgba(255, 0, 0, 0.25)' : '0 0 0 0.25rem rgba(13, 110, 253, 0.25)'
                        }}
                        placeholder="Enter Name"
                        required
                    />
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                    <label htmlFor="email" className="form-label" >Enter your Email:</label>
                    <input
                        id="email"
                        name="email"
                        className="form-control"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                            marginBottom: "3vh",
                            border: errors.email ? '3px solid red' : '1px solid #ced4da',
                            boxShadow: errors.email ? '0 0 0 0.2rem rgba(255, 0, 0, 0.25)' : '0 0 0 0.25rem rgba(13, 110, 253, 0.25)'
                        }}
                        placeholder="Somaiya Email"
                        required
                    />
                    {errors.email.length > 0 && <p style={{ color: "red" }}>{errors.email}</p>}

                    <label htmlFor="memberID" className="form-label">Enter your ID No:</label>
                    {<sup><span className="text-success">On your ID Card</span></sup>}
                    <input
                        id="memberID"
                        name="memberID"
                        className="form-control"
                        type="text"
                        value={formData.memberID}
                        onChange={handleChange}
                        style={{
                            marginBottom: "3vh",
                            border: errors.memberID ? '3px solid red' : '1px solid #ced4da',
                            boxShadow: errors.memberID ? '0 0 0 0.2rem rgba(255, 0, 0, 0.25)' : '0 0 0 0.25rem rgba(13, 110, 253, 0.25)'
                        }}
                        placeholder="Enter ID No:"
                        required
                    />
                    {errors.memberID.length > 0 && <p style={{ color: "red" }}>{errors.memberID}</p>}

                    <label htmlFor="seatNum" className="form-label">Enter your Seat Number:</label>
                    <input
                        id="seatNum"
                        name="seatNum"
                        className="form-control"
                        type="text"
                        value={formData.seatNum}
                        onChange={handleChange}
                        style={{
                            marginBottom: "3vh",
                            border: errors.seatNum ? '3px solid red' : '1px solid #ced4da',
                            boxShadow: errors.seatNum ? '0 0 0 0.2rem rgba(255, 0, 0, 0.25)' : '0 0 0 0.25rem rgba(13, 110, 253, 0.25)'
                        }}
                        placeholder="Enter Seat Number (11 digit)"
                        required
                    />
                    {errors.seatNum.length > 0 && <p style={{ color: "red" }}>{errors.seatNum}</p>}

                    <label htmlFor="program" className="form-label">Select your Program:</label>
                    <Box sx={{ minWidth: 120, marginBottom: "5vh" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Program</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="program"
                                value={formData.program}
                                label="program"
                                name="program"
                                onChange={handleChange}
                                required
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 300, // Adjust as needed
                                        },
                                    },
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left"
                                    },
                                    getContentAnchorEl: null,
                                }}
                            >
                                {programMenuEl.map((item, index) => (
                                    <MenuItem key={index} value={item.value} style={{ whiteSpace: 'normal' }}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>


                    <label htmlFor="phoneNum" className="form-label">Enter your Phone Number:</label>
                    <input
                        id="phoneNum"
                        name="phoneNum"
                        className="form-control"
                        type="text"
                        value={formData.phoneNum}
                        onChange={handleChange}
                        style={{
                            marginBottom: "3vh",
                            border: errors.phoneNum ? '3px solid red' : '1px solid #ced4da',
                            boxShadow: errors.phoneNum ? '0 0 0 0.2rem rgba(255, 0, 0, 0.25)' : '0 0 0 0.25rem rgba(13, 110, 253, 0.25)'
                        }}
                        placeholder="Enter your Phone Number"
                        required
                    />
                    {errors.phoneNum.length > 0 && <p style={{ color: "red" }}>{errors.phoneNum}</p>}

                    <label htmlFor="sport" className="form-label">Select Sport:</label>
                    {formData.program === "" && <sup><span className="text-danger">*First Select Your Program</span></sup>}
                    <Box sx={{ minWidth: 120, marginBottom: "5vh" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sport</InputLabel>
                            <Select
                                disabled={formData.program ? false : true}
                                labelId="demo-simple-select-label"
                                id="sport"
                                value={formData.sport}
                                label="sport"
                                name="sport"
                                onChange={handleChange}
                                required
                            >
                                {sportsList.map((item, index) => (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {cap && <div style={{ marginTop: "-30px", marginBottom: "30px", fontWeight: "bold" }}>Available Seats: {cap}<br /></div>}

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