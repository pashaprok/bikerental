import React from 'react';
import BoxTitle from './BoxTitle';

export default function BoxContent({title, children}) {
  return (
    <div className="box-content">
        <BoxTitle title={title} />
        {children}
    </div>
  );
}