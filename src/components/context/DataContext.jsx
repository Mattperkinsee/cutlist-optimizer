/* eslint-disable react/prop-types */
// DataContext.js
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [rows, setRows] = useState([]);


  return (
    <DataContext.Provider
    value={{
      rows,
      setRows,
    }}
  >
    {children}
  </DataContext.Provider>
  
  );
};
