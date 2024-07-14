import { ENDPOINT_URL } from "../constants/constant";

export const getAllMinors = () => {
  return fetch(`${ENDPOINT_URL}/getMinor`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
   .then((response) => {return response})
    .then((response) => {return response.json()} )
    .catch((err) => console.log("Error getting resource:", err));
};

