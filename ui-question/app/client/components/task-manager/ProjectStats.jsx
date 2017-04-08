/* @flow */
import React from 'react';
import style from './style.scss';

export default ({ numOfProject }: { numOfProject: number }) => (
  <div className={style.ProjectStats}>
    <b>{numOfProject}</b>
    <div>{numOfProject <= 1 ? 'PROJECT' : 'PROJECTS'}</div>
  </div>
);
