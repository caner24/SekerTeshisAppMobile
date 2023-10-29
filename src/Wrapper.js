import React, {useEffect} from 'react';
import Router from './Router';
import DiabetProvider from './context/DiabetProvider';
export default function Wrapper() {
  return (
    <DiabetProvider>
      <Router />
    </DiabetProvider>
  );
}
