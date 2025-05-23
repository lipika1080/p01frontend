import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Spinner, Divider } from '@chakra-ui/react';
import axios from 'axios';

const SavedSummaries = () => {
  const [summaries, setSummaries] = useState<{ note: string; summary: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://p01backend.azurewebsites.net/summaries')
      .then(res => setSummaries(res.data))
      .catch(() => setSummaries([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box p={8} maxW="3xl" mx="auto">
      <Heading mb={6}>Saved Summaries</Heading>
      {loading ? <Spinner /> : (
        <VStack spacing={4} align="stretch">
          {summaries.map((item, index) => (
            <Box key={index} p={4} bg="gray.100" borderRadius="md">
              <Text fontWeight="bold">Original:</Text>
              <Text mb={2}>{item.note}</Text>
              <Divider my={2} />
              <Text fontWeight="bold">Summary:</Text>
              <Text>{item.summary}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default SavedSummaries;