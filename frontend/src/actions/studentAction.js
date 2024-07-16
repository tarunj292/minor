import { ENDPOINT_URL } from "../constants/constant";

export const getAllPrograms = () => {
  return fetch(`${ENDPOINT_URL}/getAllPrograms`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((response) => { return response })
    .then((response) => { return response.json() })
    .catch((err) => console.log("Error getting resource:", err));
};

export const getAllMinorByProgram = (progName) => {
  return fetch(`${ENDPOINT_URL}/getAllMinorByProgram/${progName}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  }).then((response) => { return response })
    .then((response) => { return response.json() })
    .catch((err) => console.log("Error getting minors for this program:", err));
}

export const getAllMinors = () => {
  return fetch(`${ENDPOINT_URL}/getMinor`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((response) => { return response })
    .then((response) => { return response.json() })
    .catch((err) => console.log("Error getting resource:", err));
};

export const getOneMinor = (courseName) => {
  return fetch(`${ENDPOINT_URL}/getOneMinor/${courseName}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((response) => { return response })
    .then((response) => { return response.json() })
    .catch((err) => console.log("Error getting resource:", err));
};

export const createStudent = (studentData) => {
  return fetch(`${ENDPOINT_URL}/createStudent`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: studentData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error adding student:', error);
      throw error;
    });
}