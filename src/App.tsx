import { Box, Button, VStack, Heading, Textarea, useToast, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import SavedSummaries from './SavedSummaries';

const App = () => {
  const [note, setNote] = useState('');
  const [summary, setSummary] = useState('');
  const [showSaved, setShowSaved] = useState(false);
  const toast = useToast();

  const handleSummarize = async () => {
    if (!note.trim()) {
      toast({ title: 'Note is empty', status: 'warning', duration: 3000, isClosable: true });
      return;
    }
    try {
      const res = await axios.post('https://p01backend.azurewebsites.net/summarize', { note });
      setSummary(res.data.summary);
    } catch (err) {
      toast({ title: 'Error summarizing', status: 'error', duration: 3000, isClosable: true });
    }
  };

  if (showSaved) return <SavedSummaries />;

  return (
    <VStack spacing={6} p={8} maxW="xl" mx="auto">
      <Heading>AI Note Summarizer</Heading>
      <Textarea
        placeholder="Paste your meeting notes here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        size="md"
        rows={6}
      />
      <HStack spacing={4}>
        <Button colorScheme="teal" onClick={handleSummarize}>Summarize</Button>
        <Button variant="outline" onClick={() => setShowSaved(true)}>View Saved Summaries</Button>
      </HStack>
      {summary && (
        <Box w="full" p={4} bg="gray.100" borderRadius="md" whiteSpace="pre-wrap">
          {summary}
        </Box>
      )}
    </VStack>
  );
};

export default App;
