import React, { useState, useEffect } from 'react';
import { getAllSports, getStudentsFromSport } from '../actions/sportsActions';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

const SportsDisplay = () => {
    const [sports, setSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [batchesWithStudents, setBatchesWithStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchSports();
    }, []);

    useEffect(() => {
        // Ensure batchesWithStudents is an array
        if (Array.isArray(batchesWithStudents)) {
            // Flatten the students and log them
            const flattenedStudents = batchesWithStudents.flatMap(batch => {
                console.log('Batch students:', batch.students); // Debugging output
                return batch.students;
            });
            
            // Filter based on the search query
            const filtered = flattenedStudents.filter(student =>
                student.seatno.toLowerCase().includes(searchQuery.toLowerCase())
            );
            
            setFilteredData(filtered);
        }
    }, [searchQuery, batchesWithStudents]);


    

    // useEffect(() => {
    //     console.log('filter')
    //     setFilteredData(stud?.filter((item) =>
    //         item?.seatno?.includes(searchQuery)
    //     ));
    // }, [searchQuery, stud])

    const fetchSports = async () => {
        try {
            const response = await getAllSports();
            const sportsArray = response.sports; // Adjust this if the array is nested under a different property

            if (Array.isArray(sportsArray)) {
                setSports(sportsArray);
            } else {
                console.error('Expected an array but got:', sportsArray);
            }
        } catch (error) {
            console.error('Error fetching sports:', error);
        }
    };



    const fetchStudentsBySport = async sportName => {
        try {
            const res = await getStudentsFromSport(sportName);
            console.log('response',res)
            setBatchesWithStudents(res);
        } catch (error) {
            console.error('Error fetching students by sport:', error);
        }
    };

    const handleSportChange = async event => {
        const sportName = event.target.value;
        setSelectedSport(sportName);
        fetchStudentsBySport(sportName);
    };

    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            batchesWithStudents.flatMap(batch =>
                batch.students.map(student => ({
                    batchName: batch.batchName,
                    seatNumber: student.seatno,
                    programName: student.programName,
                    fullName: student.name,
                    emailId: student.email,
                }))
            )
        );

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Students');

        XLSX.writeFile(wb, `${selectedSport}.xlsx`);
    };

    return (
        <div className="d-flex flex-wrap justify-content-center">
            <div className="col-md-6 col-10">
                <label htmlFor="sports" className="form-label">Select Sport</label>
                <Box sx={{ minWidth: 120, marginBottom: '5vh' }}>
                    <FormControl fullWidth>
                        <InputLabel id="sport-select-label">Sport</InputLabel>
                        <Select
                            labelId="sport-select-label"
                            id="sports"
                            value={selectedSport}
                            label="Sport"
                            onChange={handleSportChange}
                        >
                            {Array.isArray(sports) && sports.map((sport, index) => (
                                <MenuItem key={index} value={sport.name}>{sport.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* <div className="col-md-6 col-12 d-flex justify-content-end">
                    <TextField
                        className="col-12"
                        type="text"
                        id="outlined-basic"
                        label="Search by Seat Number or Roll No..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div> */}

                {batchesWithStudents.length === 0 ? (
                    <div>No Students Enrolled</div>
                ) : (
                    <div>
                        <div className="col-md mt-2 mb-2">
                            <Button variant="contained" sx={{ width: '100%' }} color="primary" onClick={downloadExcel}>
                                Download Excel
                            </Button>
                        </div>
                        {batchesWithStudents.map((batch, index) => (
                            <div key={index}>
                                <h3>{batch.batchName}</h3>
                                <table id="studentTable" className="table red">
                                    <thead>
                                        <tr className="red">
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Seat</th>
                                            <th scope="col">Member ID</th>
                                            <th scope="col">Mobile No.</th>
                                            <th scope="col">Program</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {batch.students && batch.students.map((student, idx) => (
                                            <tr key={idx} className="table-row">
                                                <th scope="row">{idx + 1}</th>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                <td>{student.seatno}</td>
                                                <td>{student.memberid}</td>
                                                <td>{student.mobileno}</td>
                                                <td>{student.programName}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SportsDisplay;
