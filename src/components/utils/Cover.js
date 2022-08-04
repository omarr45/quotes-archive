import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

const Cover = ({ name, login, coverImg }) => {
  if ((name, login, coverImg)) {
    return (
      <div
        className='d-flex justify-content-center flex-column text-center '
        style={{ background: '#000', minHeight: '100vh' }}>
        <div className='mt-auto text-light mb-5'>
          <div
            className=' ratio ratio-1x1 mx-auto mb-2'
            style={{ maxWidth: '320px' }}>
            <img src={coverImg} alt='' />
          </div>
          <h1>{name}</h1>
          <h4>A collection of the world's finest quotes</h4>
          <p>Please connect your wallet to continue.</p>
          <Button
            onClick={login}
            variant='outline-light'
            className='rounded-pill px-3 mt-3'>
            Connect Wallet
          </Button>
        </div>
        <p className='mt-auto text-secondary'>
          developed by Omar AbdulRahman, powered by NEAR
        </p>
      </div>
    );
  }
  return null;
};

Cover.propTypes = {
  name: PropTypes.string,
};

Cover.defaultProps = {
  name: '',
};

export default Cover;
