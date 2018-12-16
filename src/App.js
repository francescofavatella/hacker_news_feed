import React, { Component } from 'react';
import styles from './App.module.css';

import TopStories from './components/topStories/TopStories';

const Header = props => (
  <header className={styles.headerContainer}>{props.children}</header>
);
const Body = props => (
  <div className={styles.bodyContainer}>{props.children}</div>
);
const Footer = props => (
  <footer className={styles.footerContainer}>{props.children}</footer>
);

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Header>
          <b>Hacker News</b> | TopStories
        </Header>
        <Body>
          <TopStories />
        </Body>
        <Footer />
      </div>
    );
  }
}

export default App;
