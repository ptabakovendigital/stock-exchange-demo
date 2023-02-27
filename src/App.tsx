import React from 'react';
import { Container } from "@mui/material";
import Header from "./components/layout/Header";
import CompanyStatistics from "./components/CompanyStatistics";

function App() {
  return (
    <div className="App">
      <Header />      
      <Container sx={{mt: 4}}>
        <CompanyStatistics />
      </Container>      
    </div>
  );
}

export default App;
