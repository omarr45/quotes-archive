import './App.css';

import { Container, Nav } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { accountBalance, logout as destroy, login } from './utils/near';

import Cover from './components/utils/Cover';
// import { Notification } from './components/utils/Notifications';
import Products from './components/marketplace/Products';
import Wallet from './components/Wallet';
import coverImg from './assets/img/sandwich.jpg';

const App = function AppWrapper() {
  const account = window.walletConnection.account();

  const [balance, setBalance] = useState('0');

  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  });

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
            <Products />
          </main>
        </Container>
      ) : (
        <Cover name='Street Food' login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default App;

// function App() {
//   const account = window.walletConnection.account();

//   const [products, setProducts] = useState([]);

//   const fetchProducts = useCallback(async () => {
//     if (account.accountId) {
//       setProducts(await getProducts());
//     }
//   }, [account]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   return (
//     <>
//       {account.accountId ? (
//         products.forEach((product) => console.log(product))
//       ) : (
//         <button onClick={login}>CONNECT WALLET</button>
//       )}
//     </>
//   );
// }

// export default App;
