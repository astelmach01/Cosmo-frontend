import React from 'react';
import { TailSpin } from 'react-loader-spinner';

function Loader() {
  return (
    <TailSpin
      height={80}
      width={80}
      color= "#6b38fb"
      ariaLabel="tail-spin-loading"
      radius={1}
      wrapperStyle={{}}
      wrapperClass=""
      visible
    />
  );
}

export default Loader;