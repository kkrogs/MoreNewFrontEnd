import React from 'react';
import { useQuery } from '@apollo/client';

import MemoryList from '../components/MemoryList';
import MemoryForm from '../components/MemoryForm';

import { QUERY_MEMORIES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_MEMORIES);
  const memories = data?.memories || [];

  return (
    <main>
      <div className="flex-row justify-center fontFam">
        <div
          className="col-12 col-md-10 mb-3 p-3 fontFam"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <MemoryForm />
        </div>
        <div className="col-12 col-md-8 mb-3 fontFam">
          {loading ? (
            <div className="fontFam">Loading...</div>
          ) : (
            <MemoryList 
              memories={memories}
              // title="Memory List"
              className="fontFam"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
