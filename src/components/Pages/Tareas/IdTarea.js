// idState.js

import { useState } from 'react';

let globalId = 0; // Valor inicial del id

export const IdTarea = () => {
  const [id, setId] = useState(globalId);

  const setGlobalId = (newId) => {
    globalId = newId;
    setId(newId);
  };

  return [id, setGlobalId];
};