// import {useEffect, useState, useRef} from 'react'

// export const useLocalStorageState = (
//     key: any,
//     defaultValue: any,
//     {serialize = JSON.stringify, deserialize = JSON.parse} = {},
//   ) => {
//     const [state, setState] = useState(() => {
//       // ^ by adding () => we are enabling lazy state initialisation
//       // We call window.localStorage when we need a value not every time we set a value
//       const valueInLocalStorage = window.localStorage.getItem(key) || defaultValue
//     })
//       //if (valueInLocalStorage) {
//        // return deserialize(valueInLocalStorage)
//      // }
//       //return typeof defaultValue === 'function' ? defaultValue() : defaultValue
//       //^ If the default value is a complex function or computationally expensive.
//       // This calls the function to return the data.
//     //})
  
//     const prevKeyRef = useRef(key)
//     //If you want to remove the prev key we can use ref as it doesn't re-render
  
//     useEffect(() => {
//       const prevKey = prevKeyRef.current
//       if (prevKey !== key) {
//         window.localStorage.removeItem(prevKey)
//       }
//       //^removes previous key if the key changes between renders.
//       prevKey.current = key
//       //^ lazy state initialisation sets item when name changes
//       //Local storage accepts strings - if we pass in numbers, we want to get then back as numbers.
//       // We can stringify data we send to the store then parse it on return
//       window.localStorage.setItem(key, serialize(state))
//     }, [key, state, serialize])
  
//     return [state, setState]
//   }


import { useEffect, useState, useRef } from 'react';

export const useLocalStorageState = (
  key: string,
  defaultValue: [],
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
) => {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    return valueInLocalStorage ? deserialize(valueInLocalStorage) : defaultValue;
  });

  //const prevKeyRef = useRef(key);

  // useEffect(() => {
  //   const prevKey = prevKeyRef.current;
  //   if (prevKey !== key) {
  //     window.localStorage.removeItem(prevKey);
  //   }

  //   prevKeyRef.current = key;
  //   window.localStorage.setItem(key, serialize(state));
  // }, [key, state, serialize]);

  // Ensure the state is always an array
  const stateArray = Array.isArray(state) ? state : [state];

  return [stateArray, setState];
};

