import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import StoryContainer, { StoryLoading, StoryFailed } from '../StoryContainer';
import Story from '../../story/Story';
import storyLoader from '../StoryLoader';

jest.mock('../StoryLoader');

describe('StoryContainer', () => {
  let resultMock;
  beforeEach(() => {
    resultMock = {
      score: 11,
      title: 'Title_mock',
      author: 'Author_mock',
      text: 'Text_mock',
      upvotingUrl: 'upvotingUrl_mock',
      storyUrl: 'storyUrl_mock',
      expanded: false,
    };
  });
  afterEach(() => {
    storyLoader.mockClear();
  });

  describe('with no props', () => {
    const component = <StoryContainer />;

    it('renders without crashing', () => {
      shallow(component);
    });

    it('matches snapshot', () => {
      const tree = TestRenderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('loading data', async () => {
    it('should show Story if success', done => {
      expect.assertions(7);

      const fetch = async () => Promise.resolve(resultMock);
      storyLoader.mockImplementation(fetch);

      const wrapper = shallow(<StoryContainer storyId={1} />);
      expect(wrapper.find(StoryLoading).length).toEqual(1);
      setTimeout(() => {
        wrapper.update();
        expect(storyLoader.mock.calls.length).toEqual(1);
        expect(wrapper.instance().state.loading).toEqual(false);
        expect(wrapper.instance().state.storyProps).toEqual(resultMock);
        const createdStory = wrapper.find(Story);
        expect(createdStory.length).toEqual(1);
        expect(createdStory.props()).toEqual(resultMock);
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });

    it('should show StoryFailed if error', async done => {
      expect.assertions(5);

      const fetch = async () => Promise.reject(new Error('error'));
      storyLoader.mockImplementation(fetch);

      const wrapper = shallow(<StoryContainer storyId={1} />);
      expect(wrapper.find(StoryLoading).length).toEqual(1);
      setTimeout(() => {
        wrapper.update();

        expect(storyLoader.mock.calls.length).toEqual(1);
        expect(wrapper.instance().state.loading).toEqual(false);
        expect(wrapper.find(StoryFailed).length).toEqual(1);
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });
  });

  describe('on click event', () => {
    it('should expand the story if it is closed', () => {
      const wrapper = shallow(<StoryContainer storyId={1} />);
      wrapper.setState({
        storyProps: resultMock,
        loading: false,
      });

      expect(wrapper.state().expanded).toEqual(false);
      expect(wrapper.find('li').hasClass('storyContainerSmall')).toEqual(true);

      wrapper.find('li').simulate('click');

      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state().expanded).toEqual(true);
      expect(wrapper.find('li').hasClass('storyContainerLarge')).toEqual(true);
    });

    it('should close the story if it is expanded', () => {
      const wrapper = shallow(<StoryContainer storyId={1} />);
      wrapper.setState({
        storyProps: resultMock,
        loading: false,
        expanded: true,
      });

      expect(wrapper.state().expanded).toEqual(true);
      expect(wrapper.find('li').hasClass('storyContainerLarge')).toEqual(true);

      wrapper.find('li').simulate('click');

      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state().expanded).toEqual(false);
      expect(wrapper.find('li').hasClass('storyContainerSmall')).toEqual(true);
    });
  });
});
