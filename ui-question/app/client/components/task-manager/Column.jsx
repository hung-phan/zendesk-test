/* @flow */
import React from 'react';
import ProjectStats from './ProjectStats';
import Row from './Row';
import style from './style.scss';

export const Column = (
  {
    tag,
    rowsData,
    moveProject
  }: { tag: string, rowsData: Array<{ id: number, name: string }>, moveProject: Function }
) => (
  <div className={style.Column}>
    <div className={style.ColumnHeader}>
      <h3>{tag}</h3>
      <ProjectStats numOfProject={rowsData.length} />
    </div>
    <div className={style.ColumnBody}>
      {rowsData.map((rowData, index) => (
        <Row
          key={rowData.id}
          index={index}
          tag={tag}
          value={rowData.name}
          moveProject={moveProject}
        />
      ))}
    </div>
  </div>
);

export default Column;
