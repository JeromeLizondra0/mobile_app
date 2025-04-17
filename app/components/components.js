// components/YourComponent.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
// import { fetchData } from '../auth/services/authService';  // Import the fetch function

const YourComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const apiData = await fetchData('/auth/login');  // Use the correct endpoint here
        setData(apiData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>{data ? JSON.stringify(data) : 'No data available'}</Text>
      )}
    </View>
  );
};

export default YourComponent;
