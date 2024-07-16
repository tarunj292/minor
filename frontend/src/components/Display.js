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

    useEffect(() => { fetchMinorCourses() }, [])
    useEffect(() => { }, [minorCourse])
    const fetchOneMinor = async (courseName) => {
        try {
            const res = await getOneMinor(courseName)
            console.log(res)
            const studArr = res.students.map(item => item)
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
            {stud.length > 0 && (
                <div>
                    {stud.map((item, index) =>
                        <h1 key={index}>{item.name}</h1>
                    )}
                </div>
            )}
        </>
    )
}

export default Display;