import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';

import PropTypes from 'prop-types';

const AddQuote = ({ save }) => {
  const [text, setText] = useState('');
  const [character, setCharacter] = useState('');
  const [price, setPrice] = useState(0);
  const isFormFilled = () => text && character && price;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        title='Add a new quote'
        onClick={handleShow}
        variant='dark'
        className='rounded-pill px-0'
        style={{ width: '38px' }}>
        <i className='bi bi-plus'></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Quote</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel controlId='inputName' label='Quote' className='mb-3'>
              <Form.Control
                type='text'
                onChange={(e) => {
                  setText(e.target.value);
                }}
                placeholder='Enter the quote'
              />
            </FloatingLabel>
            <FloatingLabel
              controlId='inputcharacter'
              label='Said by'
              className='mb-3'>
              <Form.Control
                type='text'
                placeholder='character'
                onChange={(e) => {
                  setCharacter(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId='inputPrice'
              label='Price'
              className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Price'
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FloatingLabel>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='dark'
            disabled={!isFormFilled()}
            onClick={() => {
              save({
                text,
                character,
                price,
              });
              handleClose();
            }}>
            Add Quote
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddQuote.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddQuote;
