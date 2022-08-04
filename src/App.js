import './App.css';

import { Container, Nav } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { accountBalance, logout as destroy, login } from './utils/near';

import Cover from './components/utils/Cover';
import Quotes from './components/marketplace/Quotes';
import Wallet from './components/Wallet';
import coverImg from './assets/img/cover.png';

const App = function AppWrapper() {
  const account = window.walletConnection.account();

  const [balance, setBalance] = useState('0');

  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  }, [account]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <>
      {/* <Notification /> */}
      {account.accountId ? (
        <Container fluid='md'>
          <Nav className='justify-content-end pt-3 pb-5'>
            <Nav.Item>
              <Wallet
                address={account.accountId}
                amount={balance}
                symbol='NEAR'
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main>
            <Quotes />
          </main>
        </Container>
      ) : (
        <Cover name='The Quotes Archive' login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default App;
