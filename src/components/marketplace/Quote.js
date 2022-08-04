import { Badge, Button, Card, Col, Stack } from 'react-bootstrap';

import PropTypes from 'prop-types';
import React from 'react';
import { utils } from 'near-api-js';

const Quote = ({ quote, like }) => {
  const { id, price, text, likes, character, owner } = quote;

  const triggerLike = () => {
    like(id, price);
  };

  const formatQuote = (q) => {
    // remove quotes if exist in the beginning and end of the text
    const quote = q.replace(/^"(.*)"$/, '$1');
    // remove the last character if it is a dot
    const quoteWithoutDot = quote.endsWith('.') ? quote.slice(0, -1) : quote;
    // add " to the beginning and end of the text
    const quoteWithQuotes = `"${quoteWithoutDot}"`;
    return quoteWithQuotes;
  };

  return (
    <Col key={id}>
      <Card className=' h-100'>
        <Card.Header>
          <Stack direction='horizontal' gap={2}>
            <span className='font-monospace text-secondary'>{owner}</span>
            <Badge bg='primary' className='ms-auto'>
              {likes} ♥
            </Badge>
          </Stack>
        </Card.Header>
        <Card.Body className='d-flex  flex-column text-center'>
          <Card.Title style={{ marginTop: 'auto' }}>
            {formatQuote(text)}
          </Card.Title>
          <Card.Text className='text-secondary'>
            <span>{character}</span>
          </Card.Text>
          <Button
            variant='outline-dark'
            onClick={triggerLike}
            className='w-100 py-3'
            style={{ marginTop: 'auto' }}>
            Like for {utils.format.formatNearAmount(price)} NEAR
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Quote.propTypes = {
  quote: PropTypes.instanceOf(Object).isRequired,
  like: PropTypes.func.isRequired,
};

export default Quote;
