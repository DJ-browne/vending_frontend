import React from 'react';
import './App.css';
import AppBar from './components/AppBar';
import VendingMachineComponent from './components/VendingMachineComponent';
import { Container, Typography } from '@mui/material';

function App() {


  const [userSelected, setUserSelected] = React.useState<Record<string, any> | null>(null);
  const [depositedFunds, setDepositedFunds] = React.useState<number>(0);

  const handlePayment = (cartTotal: number) => {
    const updatedDepositAmount = depositedFunds - cartTotal;
    setDepositedFunds(updatedDepositAmount)
  }

  const updateUserInDatabase = async (purchaseAmount: number) => {

    if (userSelected) {

      const userSelectedId = userSelected.id;

      await fetch(`http://localhost:5000/users/${userSelectedId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          purchasePrice: purchaseAmount,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })

    }
  }

  const updateItemsInDatabase = () => {

  }

  const depositFundsForUser = () => {
    if (userSelected) {
      const userSelectedCopy = userSelected;
      if (userSelected.balance < 1000) {
        alert("Not enough funds to deposit")
        return;
      }
      userSelectedCopy.balance = userSelectedCopy.balance - 1000;

      setUserSelected(userSelectedCopy)
      setDepositedFunds(depositedFunds + 1000);

    }
  }
  const withdrawFundsForUser = () => {
    if (userSelected) {
      const userSelectedCopy = userSelected;

      userSelectedCopy.balance = userSelectedCopy.balance + depositedFunds;

      setUserSelected(userSelectedCopy)
      setDepositedFunds(0);
    }
  }

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
          <VendingMachineComponent updateUserInDatabase={updateUserInDatabase} depositFundsForUser={depositFundsForUser} depositedFunds={depositedFunds} withdrawFundsForUser={withdrawFundsForUser} handlePayment={handlePayment} />
        </Container>

      </section>





    </div>
  );
}

export default App;
