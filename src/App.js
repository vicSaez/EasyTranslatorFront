import './App.css';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Paper, TextField,FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function CallAPI(sourceLanguage,targetLanguage,sourceText) {

  return fetch(`http://localhost:49156/api/v1/Translate?sourceLanguage=${sourceLanguage}&targetLanguage=${targetLanguage}&sourceText=${sourceText}`, { method: 'GET', mode: 'cors' })
  .then(data => data.json());

}

export default function App() {

  const [sourceText, setSourceText] = React.useState('');
  const [targetText, setTargetText] = React.useState('');
  const [sourceLanguage, setSourceLanguage] = React.useState('auto');
  const [targetLanguage, setTargetLanguage] = React.useState('de');
  const [isFormInvalid, setIsFormInvalid] = React.useState(true);

  const validate = (value) => {
    if ( value !== "") {
      setIsFormInvalid(false);
    } else {
      setIsFormInvalid(true);
    }
  };
  
  const handleSorceTextChange = (event) => {
    setSourceText(event.target.value);
    validate(event.target.value);
  };

  const handleSourceLanguageChange = (event) => {
    setSourceLanguage(event.target.value);
  };

  const handleTargetLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  const translateClick = () => {
    CallAPI(sourceLanguage,targetLanguage,sourceText).then( (json) => {setTargetText(json.targetText);}); //JSON.stringify(json)    
  }

  return (
    <Container maxWidth="sm" className="App">
      <Box >
      <Typography variant="h4" component="h1" gutterBottom align="left">
          Easy Translator V1
        </Typography>
      </Box>
      <Box>
        <Paper>
        <TextField
          id="outlined-multiline-flexible"
          label="Source Text"
          multiline
          maxRows={4}
          value={sourceText}
          onChange={handleSorceTextChange}
          fullWidth
        />
        </Paper>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', p:2 }}>
        <Box sx={{ minWidth:120 }}>
        <FormControl >
        <InputLabel id="demo-simple-select-label">Source</InputLabel> 
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sourceLanguage}
              label="Source"
              onChange={handleSourceLanguageChange}
             >
              <MenuItem value={"auto"}>Auto</MenuItem>
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"de"}>German</MenuItem>
              <MenuItem value={"fr"}>French</MenuItem>
            </Select>
        </FormControl>
        </Box>
        <Box>
        <FormControl >
          <InputLabel id="demo-simple-select-label">Target</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={targetLanguage}
              label="Target"
              onChange={handleTargetLanguageChange}
             >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"de"}>German</MenuItem>
              <MenuItem value={"fr"}>French</MenuItem>
            </Select>
        </FormControl>
        </Box>
        <Box sx={{p:1}}>
          <Button variant="contained" color="primary" onClick={translateClick} disabled={isFormInvalid}>
          Translate
          </Button>
        </Box>
      </Box>
      <Box>
        <Paper>
        <TextField
          id="outlined-multiline-flexible"
          label="Tanslation"
          multiline
          maxRows={4}
          value={targetText}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        </Paper>
      </Box>
    </Container>
  );
}




