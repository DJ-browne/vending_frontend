import React from 'react';
import './App.css';
import AppBar from './components/AppBar';
import VendingMachineComponent from './components/VendingMachineComponent';
import { Container, Typography } from '@mui/material';

function App() {


  const [userSelected, setUserSelected] = React.useState<Record<string, any> | null>(null);


  return (
    <div className="App">
      <AppBar setUserSelected={setUserSelected} userSelected={userSelected} />
      <section >
        <Container className='vending_parent_container' maxWidth="md">
          <Typography
            variant="h6"
            noWrap
            className='vending_heading'
            sx={{
              fontFamily: 'monospace',
              fontSize: 22,
              fontWeight: 700,
              marginTop: '20px',
              marginBottom: '20px',
              textDecoration: 'none',
            }}
          >Vending Machine</Typography>
          <VendingMachineComponent />
        </Container>

      </section>





    </div>
  );
}

export default App;
