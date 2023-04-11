import * as THREE from 'three';

const fetch = require('node-fetch');
const fs = require('fs');

// Replace <ACCESS_TOKEN> with your actual access token
const accessToken = 'EAAqI6rIvLuMBAKSyBdxL1pAfChD1wPQf0dhFHZBXQyB4xum3WWqIQnrryNEswaYaFaEnAvqzb8cA0bxODDKSRP0p8bpmvNB0ZCZASP72uzDDlvWKEbaJYHn6XKLqXGZCnZCfaz118sg5d0MZCKTHAoeRqNdKXmQuiZBDZC4GyGnb1hfPeg2LaB0cPV7o4FzJjWxp1YhXpbWNVJBweLih27tkR7ZBsLubZApQViQ3sv1xAuamoDa8J1XNy5';

// Make a GET request to the /me/friends endpoint with the required fields and access token
fetch(`https://graph.facebook.com/me/friends?fields=name,birthday,gender&access_token=${accessToken}`)
  .then(response => response.json())
  .then(data => {
    // Extract the list of friends from the response
    const friends = data.data;

    // Convert the list of friends to a CSV string
    const csvData = friends.map(friend => {
      const name = friend.name;
      const birthday = friend.birthday;
      const gender = friend.gender;

      return `${name},${birthday},${gender}`;
    }).join('\n');

    // Write the CSV data to a file
    fs.writeFileSync('friends.csv', csvData);

    console.log('Friends data saved to friends.csv');
  })
  .catch(error => {
    console.error(error);
  });
