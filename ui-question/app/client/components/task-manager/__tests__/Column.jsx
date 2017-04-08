import _ from 'lodash';
import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import { __RewireAPI__ as Module, Column } from '../Column';
import mockingComponent from '../../../helpers/createMockingComponent';

describe('Component: Column', () => {
  const data = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' },
    { id: 4, name: 'Project 4' }
  ];
  const Row = mockingComponent('Row');
  let component;

  before(() => {
    Module.__Rewire__('Row', Row);
  });

  after(() => {
    Module.__ResetDependency__('Row');
  });

  beforeEach(() => {
    component = shallow(
      <Column connectDropTarget={_.identity} tag="Todo" rowsData={data} />
    );
  });

  it('should render title', () => {
    assert(component.contains('Todo'));
  });

  it('should render 4 rows', () => {
    const rows = component.find(Row).nodes;

    assert.lengthOf(rows, 4);
  });
});
