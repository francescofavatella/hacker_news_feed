import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TopStories from '../TopStories';

describe('TopStories', () => {
  describe('with no props', () => {
    const component = <TopStories />;

    it('renders without crashing', () => {
      shallow(component);
    });

    it('matches snapshot', () => {
      const tree = TestRenderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
