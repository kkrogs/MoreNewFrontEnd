import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MEMORY } from '../../utils/mutations';
import { QUERY_MEMORIES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const MemoryForm = () => {
  const [memoryText, setMemoryText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addMemory, { error }] = useMutation(ADD_MEMORY, {
    update(cache, { data: { addMemory } }) {
      try {
        const { memories } = cache.readQuery({ query: QUERY_MEMORIES });

        cache.writeQuery({
          query: QUERY_MEMORIES,
          data: { memories: [addMemory, ...memories] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, memories: [...me.memories, addMemory] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMemory({
        variables: {
          memoryText,
          memoryAuthor: Auth.getProfile().data.username,
        },
      });

      setMemoryText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'memoryText' && value.length <= 280) {
      setMemoryText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="memoryText"
                placeholder="Here's a new memory..."
                value={memoryText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Memory
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your memories. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default MemoryForm;
