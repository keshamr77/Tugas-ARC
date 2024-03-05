const axios = require('axios');

// Membuat permintaan GET ke URL tertentu
axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Membuat permintaan POST dengan data tertentu
axios.post('https://jsonplaceholder.typicode.com/posts', {
    title: 'halo bang',
    body: 'never gonna give you up, never gonna let you down, never gonna run around and desert you',
    userId: 1
  })
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
