/* @flow */
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddProject from './AddProject';
import ProjectStats from './ProjectStats';
import { selectors, addProject, moveProject } from './logicBundle';
import Column from './Column';
import { TAGS } from './config';
import style from './style.scss';

export const TaskManagement = (
  {
    numOfProject,
    projects,
    actions
  }: {
    numOfProject: number,
    projects: { [key: string]: string[] },
    actions: { addProject: Function, moveProject: Function } // eslint-disable-line
  }
) => (
  <div className="container">
    <div className={style.Header}>
      <AddProject callback={actions.addProject} />
      <div className={style.TotalStats}>
        <h4>TOTAL</h4>
        <ProjectStats numOfProject={numOfProject} />
      </div>
    </div>
    <div className={style.Columns}>
      {TAGS.map(tag => (
        <Column
          key={tag}
          tag={tag}
          rowsData={projects[tag]}
          moveProject={actions.moveProject}
        />
      ))}
    </div>
  </div>
);

export const enhance = compose(
  connect(
    state => ({
      numOfProject: selectors.getNumOfProject(state),
      projects: selectors.getProjects(state)
    }),
    dispatch => ({
      actions: bindActionCreators({ addProject, moveProject }, dispatch)
    })
  )
);

export default enhance(TaskManagement);
