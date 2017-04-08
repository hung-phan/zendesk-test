import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Column, { __RewireAPI__ as Module } from '../Column';
import mockingComponent from '../../../helpers/createMockingComponent';

describe('Component: Column', () => {
  const data = [
    'Project 1',
    'Project 2',
    'Project 3',
    'Project 4'
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
    component = shallow(<Column tag="Todo" rowsData={data} />);
  });

  it('should render title', () => {
    assert(component.contains('Todo'));
  });

  it('should render 4 rows', () => {
    const rows = component.find(Row).nodes;

    assert.lengthOf(rows, 4);
  });
});
