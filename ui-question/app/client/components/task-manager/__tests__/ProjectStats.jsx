import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import ProjectStats from '../ProjectStats';

describe('Component: ProjectStats', () => {
  let component;

  it('should render number of projects', () => {
    component = shallow(<ProjectStats numOfProject={0} />);
    component.contains('0 PROJECT');

    component = shallow(<ProjectStats numOfProject={1} />);
    component.contains('1 PROJECT');

    component = shallow(<ProjectStats numOfProject={2} />);
    component.contains('2 PROJECTS');
  });
});
