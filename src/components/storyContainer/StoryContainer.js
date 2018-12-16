import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Story from '../story/Story';
import styles from './StoryContainer.module.css';
import storyLoader from './StoryLoader';

export const StoryLoading = ({ storyId }) => <li key={storyId}>loading...</li>;
export const StoryFailed = ({ storyId }) => (
  <li key={storyId}>Error loading content</li>
);

export class StoryContainer extends Component {
  static propTypes = {
    storyId: PropTypes.number.isRequired,
  };
  static defaultProps = {
    storyId: -1,
  };

  constructor() {
    super();
    this.state = {
      storyProps: undefined,
      loading: true,
      expanded: false,
      failed: false,
    };
  }
  componentDidMount() {
    this.fetchStory();
  }

  fetchStory = async () => {
    try {
      const newStory = await storyLoader(this.props.storyId);
      this.setState((state, props) => ({
        storyProps: Object.assign({}, newStory),
        loading: false,
      }));
    } catch (err) {
      this.setState((state, props) => ({
        failed: true,
        loading: false,
      }));
    }
  };

  onClickStory = () =>
    this.setState((state, props) => ({
      expanded: !this.state.expanded,
    }));

  render() {
    const { storyId } = this.props;
    if (this.state.failed) {
      return <StoryFailed storyId={storyId} />;
    }
    if (this.state.loading) {
      return <StoryLoading storyId={storyId} />;
    }
    const { expanded } = this.state;

    const containerClassName = expanded
      ? styles.storyContainerLarge
      : styles.storyContainerSmall;

    return (
      <li
        onClick={this.onClickStory}
        className={styles.storyContainer + ' ' + containerClassName}
      >
        <Story {...this.state.storyProps} expanded={expanded} />
      </li>
    );
  }
}
export default StoryContainer;
