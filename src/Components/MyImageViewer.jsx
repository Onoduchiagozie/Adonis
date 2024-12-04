import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import axios from 'axios';

// const API_KEY = 'FPSX3091bc0cffc149c394a54a3c76414e7d'; // davalchi api key
const API_KEY = 'FPSX24ae06e2383d474d8e618b836b8563c7'; // chiagozie api key
const BASE_URL = 'https://api.freepik.com/v1/ai/text-to-image';

const MyImageViewer = ({ prompt, name }) => {
  const [base64Image, setBase64Image] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!prompt || prompt.trim() === '') {
      setError('Prompt is required.');
      return;
    }

    const fetchBase64Image = async () => {
      try {
        const response = await axios.post(
          BASE_URL,
          { prompt }, // Pass the prompt in the body
          {
            headers: {
              'Content-Type': 'application/json',
              'x-freepik-api-key': API_KEY,
            },
          }
        );

        if (response.data?.data?.[0]?.base64) {
          setBase64Image(response.data.data[0].base64);
        } else {
          setError('No base64 image found in the response.');
          console.error('Response:', response.data);
        }
      } catch (err) {
        setError(
          `Request failed: ${err.response?.data?.message || err.message}`
        );
        console.error('Error Response:', err.response?.data || err.message);
      }
    };

    fetchBase64Image();
  }, [prompt]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {error ? (
        <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
      ) : base64Image ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={{}}
            style={{ width: 300, height: 200, borderRadius: 10 }}
          />
          <Text style={{}}>{name}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default MyImageViewer;
