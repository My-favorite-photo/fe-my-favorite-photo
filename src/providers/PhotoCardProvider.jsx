'use client';

import { createContext, useContext, useState } from 'react';

const PhotoCardContext = createContext();

export function PhotoCardProvider({ children }) {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <PhotoCardContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
      }}
    >
      {children}
    </PhotoCardContext.Provider>
  );
}

export const usePhotoCards = () => useContext(PhotoCardContext);
