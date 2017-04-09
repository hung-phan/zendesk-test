import _ from 'lodash';
import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import { Row } from '../Row';

describe('Component: Row', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Row
        connectDragSource={_.identity}
        connectDropTarget={_.identity}
        isDragging={true}
        tag="Todo"
        value="This is the value"
      />
    );
  });

  it('should render value', () => {
    assert.ok(component.contains('This is the value'));
  });
});
