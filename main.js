import * as THREE from 'three';

const fetch = require('node-fetch');
const fs = require('fs');

// Replace <ACCESS_TOKEN> with your actual access token
const accessToken = '';

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
