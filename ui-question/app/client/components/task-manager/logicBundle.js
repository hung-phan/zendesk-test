/* @flow */
import update from 'react-addons-update';
import { createAction, handleActions } from 'redux-actions';
import globalizeSelectors from '../../helpers/globalizeSelectors';
import { TAGS, TODO } from './config';
import type { AddProjectActionType, MoveProjectActionType } from './types';

const ADD_PROJECT = 'taskManagement/ADD_PROJECT';
const MOVE_PROJECT = 'taskManagement/MOVE_PROJECT';

export const addProject: AddProjectActionType = createAction(ADD_PROJECT);
export const moveProject: MoveProjectActionType = createAction(MOVE_PROJECT);

export const mountPoint = 'taskManagement';
export const selectors = globalizeSelectors(
  {
    getNumOfProject: (state: Object) => state.numOfProject,
    getProjects: (state: Object) => state.projects
  },
  mountPoint
);

export default handleActions(
  {
    [ADD_PROJECT]: (state, { payload: name }) => update(state, {
      generatedId: {
        $set: state.generatedId + 1
      },
      numOfProject: {
        $set: state.numOfProject + 1
      },
      projects: {
        [TODO]: {
          $push: [{ id: state.generatedId + 1, name }]
        }
      }
    }),
    [MOVE_PROJECT]: (
      state,
      { payload: { from, to, dragIndex, hoverIndex } }
    ) => {
      const dragProject = state.projects[from][dragIndex];

      if (from === to) {
        return update(state, {
          projects: {
            [from]: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragProject]]
            }
          }
        });
      }

      return update(state, {
        projects: {
          [from]: {
            $splice: [[dragIndex, 1]]
          },
          [to]: {
            $splice: [[hoverIndex, 0, dragProject]]
          }
        }
      });
    }
  },
  {
    generatedId: 0,
    numOfProject: 0,
    projects: TAGS.reduce(
      (obj: Object, tag: string) => {
        obj[tag] = [];
        return obj;
      },
      {}
    )
  }
);
