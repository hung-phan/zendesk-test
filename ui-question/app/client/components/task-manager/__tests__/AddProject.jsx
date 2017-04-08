import React from 'react';
import td from 'testdouble';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import AddProject from '../AddProject';

describe('Component: AddProject', () => {
  let component;
  let callback;

  beforeEach(() => {
    callback = td.function();
    component = shallow(<AddProject callback={callback} />);
  });

  it("should have title 'add project'", () => {
    assert.ok(component.contains('add project'));
  });

  it('should have an input field', () => {
    assert.ok(component.find('input').node);
  });

  context('input field', () => {
    let input;

    beforeEach(() => {
      input = component.find('input');
      input.simulate('change', { target: { value: 'project 1' } });
    });

    it('should change the input state when typing in the input field', () => {
      assert.equal(component.state().input, 'project 1');
    });

    it('should trigger the callback when pressing Enter on the input', () => {
      input.simulate('keyUp', { keyCode: 13 });
      td.verify(callback('project 1'));
      assert.equal(component.state().input, '');
    });

    it('should clear the input after pressing Enter', () => {
      input.simulate('keyUp', { keyCode: 13 });
      assert.equal(component.state().input, '');
    });
  })
});
