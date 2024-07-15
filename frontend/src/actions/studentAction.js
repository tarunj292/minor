import { ENDPOINT_URL } from "../constants/constant";

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
    // .then(data => {
    //   console.log('Success:', data);
    //   return data; // You can handle the response data as needed
    // })
    .catch(error => {
      console.error('Error adding student:', error);
      throw error;
    });
}