import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import { __RewireAPI__ as Module, TaskManagement } from '../index';
import { TODO, IN_PROGRESS, DONE } from '../config';
import mockingComponent from '../../../helpers/createMockingComponent';

describe('Component: TaskManagement', () => {
  const AddProject = mockingComponent('AddProject');
  const ProjectStats = mockingComponent('ProjectStats');
  const Column = mockingComponent('Column');
  let component;
  let props;

  before(() => {
    Module.__Rewire__('AddProject', AddProject);
    Module.__Rewire__('ProjectStats', ProjectStats);
    Module.__Rewire__('Column', Column);
  });

  beforeEach(() => {
    props = {
      actions: {},
      numOfProject: 0,
      projects: {
        [TODO]: [],
        [IN_PROGRESS]: [],
        [DONE]: []
      }
    }
    component = shallow(<TaskManagement {...props} />);
  });

  after(() => {
    Module.__ResetDependency__('AddProject');
    Module.__ResetDependency__('ProjectStats');
    Module.__ResetDependency__('Column');
  });

  it("should have 'AddProject' component", () => {
    assert.ok(component.find(AddProject).node);
  });

  it("should have 'ProjectStats' component", () => {
    assert.ok(component.find(ProjectStats).node);
  });

  it("should have 3 'Column' components with titles 'Todo', 'In Progress', and 'Done'", () => {
    const columns = component.find(Column).nodes;
    const tags = ['Todo', 'In Progress', 'Done'];

    assert.lengthOf(columns, 3);

    for (let index = 0, length = columns.length; index < length; index++) {
      assert.propertyVal(columns[index].props, 'tag', tags[index]);
    }
  });
});
