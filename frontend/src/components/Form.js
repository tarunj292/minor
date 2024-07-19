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
    const [alertMessage, setAlertMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [cap, setCap] = useState([,]);
    const [minorCourseElement, setMinorCourseElement] = useState([]);
    const [programMenuEl, setProgramMenuEl] = useState([]);

    useEffect(() => {
        updateChange()
        fetchMinorDetails(formData.minorCourse)
    }, [formData.minorCourse])
    useEffect(() => { fetchData(formData.program) }, [formData.program])
    useEffect(() => { fetchProgramData() }, [])

    const profCourseList = [
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
            console.log('getAllMinorByProgram',res);
            res.minor.map(item => {
                if (item.courseName === formData.minorCourse) {
                    setCap([item.capacity, item.remainingCapacity])
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    // const handleSubmit = (event) => {
    //     const emailRegex = /^[a-zA-Z0-9._%+-]+@somaiya\.edu$/;
    //     const seatNumRegex = /^\d{11}$/;
    //     const phoneNumRegex = /^\d{10}$/;
    //     const memberIDRegex = /^\d{10}$/;
    //     if (emailRegex.test(formData.email)) {
    //         if (seatNumRegex.test(formData.seatNum)) {
    //             if (phoneNumRegex.test(formData.phoneNum)) {
    //                 if (memberIDRegex.test(formData.memberID)) {
    //                     const data =
    //                     {
    //                         name: formData.name,
    //                         email: formData.email,
    //                         seatno: formData.seatNum,
    //                         mobileno: formData.phoneNum,
    //                         memberid: formData.memberID,
    //                         programName: formData.program,
    //                         professionalcourse: formData.profCourse,
    //                         language: formData.langCourse,
    //                         minorSubject: formData.minorCourse
    //                     }
    //                     createStudent(JSON.stringify(data)).then(res => {

    //                         if (res.success) {
    //                             updateChange()
    //                             SimpleAlert(`Successfully Enrolled in ${formData.minorCourse} course.`, "success")
    //                         } else {
    //                             SimpleAlert(res.message, "error")
    //                         }
    //                     }).catch(err => console.error(err));
    //                 } else {
    //                     SimpleAlert("Enter Correct Member ID", "error")
    //                 }
    //             } else {
    //                 SimpleAlert("Enter Correct Phone Number", "error")
    //             }
    //         } else {
    //             SimpleAlert("Enter Correct Seat Number", "error")
    //         }
    //     } else {
    //         SimpleAlert("Enter Somaiya Email id", "error")
    //     }
    //     event.preventDefault();
    // };

    const handleSubmit = (event) => {
        if (cap[1] > 0) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@somaiya\.edu$/;
            const seatNumRegex = /^\d{11}$/;
            const phoneNumRegex = /^\d{10}$/;
            const memberIDRegex = /^\d{10}$/;
            
            if (emailRegex.test(formData.email)) {
                if (seatNumRegex.test(formData.seatNum)) {
                    if (phoneNumRegex.test(formData.phoneNum)) {
                        if (memberIDRegex.test(formData.memberID)) {
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
                            }).catch(err => console.error(err));
                        } else {
                            SimpleAlert("Enter Correct Member ID", "error");
                        }
                    } else {
                        SimpleAlert("Enter Correct Phone Number", "error");
                    }
                } else {
                    SimpleAlert("Enter Correct Seat Number", "error");
                }
            } else {
                SimpleAlert("Enter Somaiya Email id", "error");
            }
        } else {
            SimpleAlert("Chosen minor is full. Please choose another minor.", "error");
        }
        
        event.preventDefault();
    };

    const fetchMinorDetails = async (minor) => {
        try {
            const res = await getOneMinor(minor)
            setCap([res.capacity, res.remainingCapacity])
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

    const fetchData = async (progName) => {
        try {
            const res = await getAllMinorByProgram(progName);
            const transformedData = res.minor.map(item => (
                {
                    value: item,
                    label: item,
                    // capacity: item.capacity,
                    // remainCap: item.remainingCapacity,
                    // disabled: item.remainingCapacity === 0 ? true : false
                }));
            setMinorCourseElement(transformedData);
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
                    <input id="name" name="name" className="form-control" type="text" value={formData.name} onChange={handleChange} style={{ marginBottom: "3vh" }} placeholder="Enter Name" required />

                    <label htmlFor="email" className="form-label" >Enter your Email:</label>
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

                    <label htmlFor="memberID" className="form-label">Enter your ID No:</label>
                    {<sup><span className="text-success">On your ID Card</span></sup>}
                    <input id="memberID" name="memberID" className="form-control" type="text" value={formData.memberID} onChange={handleChange} style={{ marginBottom: "3vh" }} placeholder="Enter ID No:" required />

                    <label htmlFor="seatNum" className="form-label">Enter your Seat Number:</label>
                    <input id="seatNum" name="seatNum" className="form-control" type="text" value={formData.seatNum} onChange={handleChange} style={{ marginBottom: "3vh" }} placeholder="Enter Seat Number (11 digit)" required />

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
                    <input id="phoneNum" name="phoneNum" className="form-control" type="text" value={formData.phoneNum} onChange={handleChange} style={{ marginBottom: "3vh" }} placeholder="Enter your Phone Number" required />

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
                                {minorCourseElement.map((option, index) => (
                                    <MenuItem key={index} value={option.value} disabled={option.disabled}>{option.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {cap[0] && <div style={{ marginTop: "-30px", marginBottom: "30px", fontWeight: "bold" }}>Total Seats: {cap[0]} {";"}   Available Seats: {cap[1]}<br /></div>}

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