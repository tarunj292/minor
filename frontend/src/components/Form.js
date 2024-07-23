import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import { getAllMinorByProgram, createStudent, getAllPrograms, getOneMinor } from '../actions/studentAction';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        memberID: '',
        seatNum: '',
        program: '',
        phoneNum: '',
        profCourse: '',
        langCourse: '',
        minorCourse: ''
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
    const [minorCourseMenuEl, setMinorCourseMenuEl] = useState([]);
    const [programMenuEl, setProgramMenuEl] = useState([]);

    useEffect(() => {
        updateChange()
        fetchMinorDetails(formData.minorCourse)
    }, [formData.minorCourse])
    useEffect(() => { fetchData(formData.program) }, [formData.program])
    useEffect(() => { setErrors(validateDetails()) }, [formData])
    useEffect(() => { fetchProgramData() }, [])

    const profCourseList = [
        "Professional Communication",
        "Hindi Language",
        "Marathi Language",
        "Sanskrit Language",
        "Gujarati Language"
    ]

    let profCourseMenuEl = profCourseList.map(item => (
        <MenuItem key={item} value={item}>{item}</MenuItem>
    ))

    const langCourseList = [
        "Chinese",
        "French",
        "german",
        "spanish",
        "urdu",
        "Italian",
        "japanese",
        "Not interested"
    ]

    let langCourseMenuEl = langCourseList.map(item => (
        <MenuItem key={item} value={item}>{item}</MenuItem>
    ))

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

    const updateChange = async () => {
        try {
            const res = await getAllMinorByProgram(formData.program);
            res.minor.forEach(item => {
                if (item.courseName === formData.minorCourse) {
                    setCap(item.remainingCapacity)
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

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
                professionalcourse: formData.profCourse,
                language: formData.langCourse,
                minorSubject: formData.minorCourse
            };

            createStudent(JSON.stringify(data)).then(res => {
                if (res.success) {
                    updateChange();
                    SimpleAlert(`Successfully Enrolled in ${formData.minorCourse} course.`, "success");
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

    const fetchMinorDetails = async (minor) => {
        try {
            const res = await getOneMinor(minor)
            setCap(res.remainingCapacity)
            setMinorCourseMenuEl((prevMinorCourseMenuEl) =>
                prevMinorCourseMenuEl.map((item) =>
                    item.value === minor ? { ...item, disabled: res.remainingCapacity <= 0 } : item
                )
            );
        } catch (error) {
            console.error(error)
        }
    }

    const fetchProgramData = async () => {
        try {
            const res = await getAllPrograms();
            const programList = res.data.map(item =>
                item.progName
            );
            let p = programList.map(item => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
            ))
            setProgramMenuEl(p)
        } catch (error) {
            console.error(error);
        }
    }

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

    const fetchData = async (progName) => {
        try {
            const res = await getAllMinorByProgram(progName);
            const transformedData = res.minor.map(item => (
                {
                    value: item,
                    label: item,
                    disabled: false
                }));
            setMinorCourseMenuEl(transformedData);
        } catch (error) {
            console.error(error);
        }
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
                            border: errors.name ? '3px solid red' : '1px solid #ced4da', // Apply red color if there's an error
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
                            border: errors.email ? '3px solid red' : '1px solid #ced4da', // Apply red color if there's an error
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
                            border: errors.memberID ? '3px solid red' : '1px solid #ced4da', // Apply red color if there's an error
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
                            border: errors.seatNum ? '3px solid red' : '1px solid #ced4da', // Apply red color if there's an error
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
                            >
                                {programMenuEl}
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
                            border: errors.phoneNum ? '3px solid red' : '1px solid #ced4da', // Apply red color if there's an error
                            boxShadow: errors.phoneNum ? '0 0 0 0.2rem rgba(255, 0, 0, 0.25)' : '0 0 0 0.25rem rgba(13, 110, 253, 0.25)'
                        }}
                        placeholder="Enter your Phone Number"
                        required
                    />
                    {errors.phoneNum.length > 0 && <p style={{ color: "red" }}>{errors.phoneNum}</p>}

                    <label htmlFor="minorCourse" className="form-label">Select Minor Course:</label>
                    {formData.program === "" && <sup><span className="text-danger">*First Select Your Program</span></sup>}
                    <Box sx={{ minWidth: 120, marginBottom: "5vh" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Minor</InputLabel>
                            <Select
                                disabled={formData.program === "" ? true : false}
                                labelId="demo-simple-select-label"
                                id="minorCourse"
                                value={formData.minorCourse}
                                label="minorCourse"
                                name="minorCourse"
                                onChange={handleChange}
                                required
                            >
                                {minorCourseMenuEl.map((option, index) => (
                                    <MenuItem key={index} value={option.value} disabled={option.disabled} >{option.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {cap && <div style={{ marginTop: "-30px", marginBottom: "30px", fontWeight: "bold" }}>Available Seats: {cap}<br /></div>}

                    <label htmlFor="profCourse" className="form-label">Select Professional Course:</label>
                    <Box sx={{ minWidth: 120, marginBottom: "5vh" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Professional</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="profCourse"
                                value={formData.profCourse}
                                label="profCourse"
                                name="profCourse"
                                onChange={handleChange}
                                required
                            >
                                {profCourseMenuEl}
                            </Select>
                        </FormControl>
                    </Box>

                    <label htmlFor="langCourse" className="form-label">Select Language:</label>
                    <Box sx={{ minWidth: 120, marginBottom: "5vh" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Language</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="langCourse"
                                value={formData.langCourse}
                                label="langCourse"
                                name="langCourse"
                                onChange={handleChange}
                                required
                            >
                                {langCourseMenuEl}
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