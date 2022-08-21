import { Button, Row } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import {
  addQuote,
  getQuotes as getQuotesList,
  getUserQuotes,
  likeQuote,
} from '../../utils/functions';

import AddQuote from './AddQuote';
import Loader from '../utils/Loader';
import Quote from './Quote';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [likedQuotes, setLikedQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedFilter, setLikedFilter] = useState(false);

  const handleGetQuotes = useCallback(async () => {
    try {
      setLoading(true);
      setQuotes(await getQuotesList());
      setLikedQuotes(await getUserQuotes());
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
          <div className='d-flex align-items-center justify-content-between mb-4 bg-info p-4 rounded'>
            <h1 className='fs-2 fw-bold mb-0'>The Quotes Archive</h1>
            <Button
              variant='danger'
              className='mb-0 fs-6 ms-auto me-3 '
              onClick={() => setLikedFilter(!likedFilter)}>
              {likedFilter ? 'Show All Quotes' : 'Show Liked Quotes Only'}
            </Button>
            <AddQuote save={handleAdd} />
          </div>
          <Row xs={1} sm={2} lg={3} className='g-3  mb-5 g-xl-4 g-xxl-5'>
            {!likedFilter
              ? quotes.map((q) => (
                  <Quote
                    quote={{
                      ...q,
                    }}
                    like={like}
                    liked={likedQuotes.find((lq) => lq.id === q.id)}
                    key={q.id}
                  />
                ))
              : quotes
                  .filter((q) => likedQuotes.find((lq) => lq.id === q.id))
                  .map((q) => (
                    <Quote
                      quote={{
                        ...q,
                      }}
                      like={like}
                      liked={likedQuotes.find((lq) => lq.id === q.id)}
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
