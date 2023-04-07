import React from 'react';
import './App.css';
import AppBar from './components/AppBar';
import VendingMachineComponent from './components/VendingMachineComponent';
import { Container } from '@mui/material';

function App() {


  const [userSelected, setUserSelected] = React.useState<Record<string, any>>({
    name: '1',
    balance: 1400
  });


  return (
    <div className="App">
      <AppBar setUserSelected={setUserSelected} userSelected={userSelected} />
      <section >
        <Container className='vending_parent_container' maxWidth="md">
          <h2 >Vending Machine</h2>
          <VendingMachineComponent />
        </Container>

      </section>





    </div>
  );
}

export default App;
