// import { NotificationError, NotificationSuccess } from '../utils/Notifications';

import React, { useCallback, useEffect, useState } from 'react';
import {
  addQuote,
  getQuotes as getQuotesList,
  likeQuote,
} from '../../utils/functions';

import AddQuote from './AddQuote';
import Loader from '../utils/Loader';
import Quote from './Quote';
import { Row } from 'react-bootstrap';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetQuotes = useCallback(async () => {
    try {
      setLoading(true);
      setQuotes(await getQuotesList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAdd = async (data) => {
    try {
      setLoading(true);
      addQuote(data).then((resp) => {
        handleGetQuotes();
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const like = async (id, price) => {
    try {
      await likeQuote({
        id,
        price,
      }).then((resp) => handleGetQuotes());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetQuotes();
  }, [handleGetQuotes]);

  return (
    <>
      {!loading ? (
        <>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h1 className='fs-4 fw-bold mb-0'>The Quotes Archive</h1>
            <AddQuote save={handleAdd} />
          </div>
          <Row xs={1} sm={2} lg={3} className='g-3  mb-5 g-xl-4 g-xxl-5'>
            {quotes.map((q) => (
              <Quote
                quote={{
                  ...q,
                }}
                like={like}
                key={q.id}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Quotes;
