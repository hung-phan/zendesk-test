import { assert } from 'chai';
import { TODO, IN_PROGRESS, DONE } from '../config';
import reducer, { addProject, moveProject } from '../logicBundle';

describe('LogicBundle: TaskManagement', () => {
  describe('addProject action', () => {
    it('should add new project to TODO column', () => {
      assert.deepEqual(
        reducer(
          {
            numOfProject: 0,
            projects: {
              [TODO]: []
            }
          },
          addProject('Project 1')
        ),
        {
          numOfProject: 1,
          projects: {
            [TODO]: ['Project 1']
          }
        }
      );
    });

    it('should add new project at the end of TODO column', () => {
      assert.deepEqual(
        reducer(
          {
            numOfProject: 3,
            projects: {
              [TODO]: ['Project 1', 'Project 2', 'Project 3']
            }
          },
          addProject('Project 4')
        ),
        {
          numOfProject: 4,
          projects: {
            [TODO]: ['Project 1', 'Project 2', 'Project 3', 'Project 4']
          }
        }
      );
    });
  });
  describe('moveProject action', () => {
    it('should rearrange projects in the same column', () => {
      assert.deepEqual(
        reducer(
          {
            projects: {
              [TODO]: ['Project 1', 'Project 2', 'Project 3', 'Project 4']
            }
          },
          moveProject({
            from: TODO,
            to: TODO,
            dragIndex: 0,
            hoverIndex: 2
          })
        ),
        {
          projects: {
            [TODO]: ['Project 2', 'Project 3', 'Project 1', 'Project 4']
          }
        }
      );
      assert.deepEqual(
        reducer(
          {
            projects: {
              [TODO]: ['Project 1', 'Project 2', 'Project 3', 'Project 4']
            }
          },
          moveProject({
            from: TODO,
            to: TODO,
            dragIndex: 1,
            hoverIndex: 2
          })
        ),
        {
          projects: {
            [TODO]: ['Project 1', 'Project 3', 'Project 2', 'Project 4']
          }
        }
      );
    });

    it('should move project between columns', () => {
      assert.deepEqual(
        reducer(
          {
            projects: {
              [TODO]: ['Project 1', 'Project 2', 'Project 3'],
              [IN_PROGRESS]: []
            }
          },
          moveProject({
            from: TODO,
            to: IN_PROGRESS,
            dragIndex: 1,
            hoverIndex: 0
          })
        ),
        {
          projects: {
            [TODO]: ['Project 1', 'Project 3'],
            [IN_PROGRESS]: ['Project 2']
          }
        }
      );
      assert.deepEqual(
        reducer(
          {
            projects: {
              [TODO]: ['Project 1', 'Project 3'],
              [IN_PROGRESS]: ['Project 2'],
              [DONE]: []
            }
          },
          moveProject({
            from: IN_PROGRESS,
            to: DONE,
            dragIndex: 0,
            hoverIndex: 0
          })
        ),
        {
          projects: {
            [TODO]: ['Project 1', 'Project 3'],
            [IN_PROGRESS]: [],
            [DONE]: ['Project 2']
          }
        }
      );
      assert.deepEqual(
        reducer(
          {
            projects: {
              [TODO]: ['Project 1', 'Project 3'],
              [IN_PROGRESS]: [],
              [DONE]: ['Project 2']
            }
          },
          moveProject({
            from: TODO,
            to: DONE,
            dragIndex: 0,
            hoverIndex: 1
          })
        ),
        {
          projects: {
            [TODO]: ['Project 3'],
            [IN_PROGRESS]: [],
            [DONE]: ['Project 2', 'Project 1']
          }
        }
      );
    });
  });
});
