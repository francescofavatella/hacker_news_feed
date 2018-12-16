import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './TopStories.module.css';
import { StoryContainer } from '../storyContainer/StoryContainer';

export class TopStories extends Component {
  constructor() {
    super();
    this.state = {
      stories: [],
      page: 0,
      storiesForPage: 10,
    };
  }

  componentDidMount() {
    //TODO: refactor this code for testing purpose
    axios
      .get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => {
        const data = res.data;
        this.setState((state, props) => ({
          stories: data,
        }));
      })
      // TODO: handle error during loading
      .catch(err => console.log(err));
  }

  loadFunc = page => {
    this.setState((state, props) => ({
      page: page,
    }));
  };

  hasMore = () => {
    const { stories, page, storiesForPage } = this.state;
    return stories.length > page * storiesForPage;
  };

  render() {
    const { stories, page, storiesForPage } = this.state;
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadFunc}
        hasMore={this.hasMore()}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <ul className={styles.container}>
          {stories
            .slice(0, Math.min(page * storiesForPage, stories.length))
            .map(storyId => (
              <StoryContainer key={storyId} storyId={storyId} />
            ))}
        </ul>
      </InfiniteScroll>
    );
  }
}

export default TopStories;
