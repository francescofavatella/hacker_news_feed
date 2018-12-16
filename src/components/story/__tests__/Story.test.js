import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Story from '../Story';
import { shortText, longText, shortenedText } from '../StoryUtils';

const short_str = 'Lorem Ipsum is simply dummy text';
const long_str =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const testSingleProp = ({ component, title, expectedValue, cssClass }) => {
  return describe(title, () => {
    it('renders without crashing', () => {
      shallow(component);
    });

    it('matches snapshot', () => {
      const tree = TestRenderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('creates ' + cssClass + ' field', () => {
      const renderedComponent = shallow(component);
      const componentByCss = renderedComponent.find(cssClass);
      expect(componentByCss).toHaveLength(1);
      expect(componentByCss.props().children).toEqual(expectedValue);
    });
  });
};

const testTextProp = ({ component, title, expectedValue, cssClass }) => {
  return describe(title, () => {
    it('renders without crashing', () => {
      shallow(component);
    });

    it('matches snapshot', () => {
      const tree = TestRenderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('creates ' + cssClass + ' field', () => {
      const renderedComponent = shallow(component);
      const componentByCss = renderedComponent.find(cssClass);
      expect(componentByCss).toHaveLength(1);
      expect(componentByCss.props().dangerouslySetInnerHTML).toEqual({
        __html: expectedValue,
      });
    });
  });
};

describe('Story', () => {
  describe('with no props', () => {
    const component = <Story />;

    it('renders without crashing', () => {
      shallow(component);
    });

    it('matches snapshot', () => {
      const tree = TestRenderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  const score = 100;
  testSingleProp({
    component: <Story score={score} />,
    title: 'with score prop',
    expectedValue: score,
    cssClass: '.score',
  });

  describe('with title prop:', () => {
    const title = 'customTitle';
    testSingleProp({
      component: <Story title={title} />,
      title: 'with a short title prop it should show the same title',
      expectedValue: title,
      cssClass: '.title',
    });

    testSingleProp({
      component: <Story title={long_str} />,
      title:
        'with a very long title and expanded=false props it should show the small title',
      expectedValue: long_str,
      cssClass: '.title',
    });

    testSingleProp({
      component: <Story title={long_str} expanded={true} />,
      title:
        'with a very long title and expanded=true props it should show the long title',
      expectedValue: longText(long_str),
      cssClass: '.title',
    });
  });

  const author = 'customAuthor';
  testSingleProp({
    component: <Story author={author} />,
    title: 'with author prop',
    expectedValue: 'By ' + author,
    cssClass: '.author',
  });

  describe('with text prop:', () => {
    const text = 'customText';
    testTextProp({
      component: <Story text={text} />,
      title: 'with a short text prop it should show the same text',
      expectedValue: text,
      cssClass: '.text',
    });

    testTextProp({
      component: <Story text={long_str} />,
      title:
        'with a very long text and expanded=false props it should show the small text',
      expectedValue: shortText(long_str),
      cssClass: '.text',
    });

    testTextProp({
      component: <Story text={long_str} expanded={true} />,
      title:
        'with a very long text and expanded=true props it should show the full text',
      expectedValue: long_str,
      cssClass: '.text',
    });
  });
});

describe('StoryUtil', () => {
  describe('shortenedText(len)(string)', () => {
    const len = 40;
    const fn = shortenedText(len);
    it('it preserves the short strings', () => {
      expect(fn(short_str).length).toEqual(short_str.length);
    });

    it('it shortens the long strings', () => {
      expect(fn(long_str).length).toEqual(len);
    });
  });
});
