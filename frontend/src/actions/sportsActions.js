import { ENDPOINT_URL } from "../constants/constant";

export const getStudentsBySport = (sportName) => {
  return fetch(`${ENDPOINT_URL}/sport/getStudentsBySport/${sportName}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((err) => {
      console.error("Error getting students by sport:", err);
      throw err;
    });
};


//check url properly
export const createStudent2 = (studentData) => {
  return fetch(`${ENDPOINT_URL}/sport/createStudent2`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: studentData
  })
    .then(response => {
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // console.log(response.json())
      return response.json();
    })
    .catch(error => {
      console.error('Error adding student:', error);
      throw error;
    });
}

export const getCapacityBySport = (programName, sportName) => {
  return fetch(`${ENDPOINT_URL}/sport/getCapacityBySport/${programName}/${sportName}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((err) => {
      console.error("Error getting Data ", err);
      throw err;
    });
}

export const getAllSports = () => {
  return fetch(`${ENDPOINT_URL}/sport/getAllSports`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((err) => {
      console.error("Error getting Data ", err);
      throw err;
    });
};



export const getStudentsFromSport = (sportName) => {
  return fetch(`${ENDPOINT_URL}/sport/getStudentsFromSport/${sportName}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((err) => {
      console.error("Error getting Data ", err);
      throw err;
    });
}