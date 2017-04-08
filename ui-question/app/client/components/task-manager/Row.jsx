/* @flow */
import React from 'react';
import style from './style.scss';

export default ({ value }: { value: string }) => (
  <div className={style.Row}>{value}</div>
);
