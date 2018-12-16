import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { longText, shortText } from './StoryUtils';
import styles from './Story.module.css';

const WithLink = props =>
  props.expanded ? (
    <a
      href={props.url}
      className={props.className + ' ' + styles.cursor}
      target={'_blank'}
      onClick={e => e.stopPropagation()}
    >
      {props.children}
    </a>
  ) : (
    <div className={props.className}>{props.children}</div>
  );

export class Story extends Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    storyUrl: PropTypes.string.isRequired,
    upvotingUrl: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    score: -1,
    title: '',
    author: '',
    text: '',
    upvotingUrl: '',
    storyUrl: '',
    expanded: false,
  };

  createMarkup = str => {
    return { __html: str };
  };
  render() {
    const {
      score,
      title,
      author,
      text,
      upvotingUrl,
      storyUrl,
      expanded,
    } = this.props;

    const storyText = expanded ? text : shortText(text);
    const storyTitle = expanded ? longText(title) : title;

    return (
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <WithLink expanded={expanded} url={upvotingUrl} className={''}>
            <div className={styles.arrowUp} />
            <div className={styles.score}>{score}</div>
          </WithLink>
        </div>
        <div className={styles.rigthColumn}>
          <WithLink expanded={expanded} url={storyUrl} className={styles.title}>
            {storyTitle}
          </WithLink>
          <div className={styles.author}>{'By ' + author}</div>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={this.createMarkup(storyText)}
          />
        </div>
      </div>
    );
  }
}

export default Story;
