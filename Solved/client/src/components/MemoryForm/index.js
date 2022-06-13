import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MEMORY } from '../../utils/mutations';
import { QUERY_MEMORIES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const MemoryForm = () => {
  // const [input, setInput] = useState('');

  // added here to define emotions, setEmotions, and emotions level
  let [emotions, setEmotions] = useState('');
  const emotionsLevel = ['Fear', 'Joy', 'Anger', 'Disgust', 'Sadness']
  // end of change

 
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

              {/* new dropdown button for emotions */}
             
              <div className="dropdown">
          <button className={`dropbtn ${emotions}`}>
            {emotions || 'Joy'}
          </button>
          <div className="dropdown-content">
            <p onClick={() => setEmotions(emotionsLevel[0])}>Fear</p>
            <p onClick={() => setEmotions(emotionsLevel[1])}>Joy</p>
            <p onClick={() => setEmotions(emotionsLevel[2])}>Anger</p>
            <p onClick={() => setEmotions(emotionsLevel[3])}>Disgust</p>
            <p onClick={() => setEmotions(emotionsLevel[4])}>Sadness</p>
          </div>
        </div>
             
              {/* end of new button */}
           
           
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
