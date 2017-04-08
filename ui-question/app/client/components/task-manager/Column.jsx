/* @flow */
/* eslint-disable react/no-array-index-key */

// This is the simple case so we can ignore the index for Row

import React from 'react';
import ProjectStats from './ProjectStats';
import Row from './Row';
import style from './style.scss';

export default ({ tag, rowsData }: { tag: string, rowsData: string[] }) => (
  <div className={style.Column}>
    <div className={style.ColumnHeader}>
      <h3>{tag}</h3>
      <ProjectStats numOfProject={rowsData.length} />
    </div>
    <div className={style.ColumnBody}>
      {rowsData.map((rowData, index) => <Row key={index} value={rowData} />)}
    </div>
  </div>
);
