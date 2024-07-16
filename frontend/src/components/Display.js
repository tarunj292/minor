import React, { useState, useEffect } from 'react'
import { getAllMinors, getOneMinor } from '../actions/studentAction';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//seat, program, name, email

const Display = () => {
    const [minorCourseArr, setMinorCourseArr] = useState([])
    const [minorCourse, setMinorCourse] = useState('')
    const [stud, setStud] = useState([])
    const [tableEl, setTableEl] = useState('')
    const [minorDetails, setMinorDetails] = useState([])

    useEffect(() => { fetchMinorCourses() }, [])
    useEffect(() => { updateStudTable() }, [stud])

    const updateStudTable = () => {
        const tableRows = stud.map((item, index) => (
            <tr key={index} className="table-row">
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.seatno}</td>
                <td>{item.memberid}</td>
                <td>{item.mobileno}</td>
                <td>{item.programName}</td>
                <td>{item.language}</td>
                <td>{item.professionalcourse}</td>
            </tr>
        ));
        setTableEl(tableRows);
    }

    const fetchOneMinor = async (courseName) => {
        try {
            const res = await getOneMinor(courseName)
            const studArr = res.students.map(item => item)
            setMinorDetails([res.capacity, res.remainingCapacity])
            setStud(studArr)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchMinorCourses = async () => {
        try {
            const res = await getAllMinors()
            let arr = res.data.map(item => item.courseName)
            setMinorCourseArr(arr)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        setMinorCourse(event.target.value)
        fetchOneMinor(event.target.value)

    }

    return (
        <>
            <label htmlFor="minorCourse" className="form-label">Select Minor Course:</label>
            <Box sx={{ minWidth: 120, marginBottom: "5vh" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Minor</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="minorCourse"
                        value={minorCourse}
                        label="minorCourse"
                        name="minorCourse"
                        onChange={(event) => handleChange(event)}
                    >
                        {minorCourseArr.map((item, index) => (
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {minorDetails.length == 2 && <div style={{ marginTop: "30px", marginBottom: "30px", fontWeight: "bold" }}>Seats: {minorDetails[0]} {" And "}   Available Seats: {minorDetails[1]} Students Enrolled: {minorDetails[0] - minorDetails[1]}<br /></div>}
            {stud.length === 0 ?
                <div >
                    No Students Enrolled
                </div>
                :
                <table className="table red">
                    <thead>
                        <tr className="red">
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Seat</th>
                            <th scope="col">Member ID</th>
                            <th scope="col">Mobile No.</th>
                            <th scope="col">Program</th>
                            <th scope="col">Language</th>
                            <th scope="col">Prof. Course</th>
                        </tr>
                    </thead>
                    <tbody >
                        {tableEl}
                    </tbody>
                </table>
            }
        </>
    )
}

export default Display;