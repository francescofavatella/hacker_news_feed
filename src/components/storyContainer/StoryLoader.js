import axios from 'axios';
import DOMPurify from 'dompurify';

const createUpvotingUrl = storyId =>
  'https://news.ycombinator.com/vote?id=' + storyId + '&how=up&goto=news';

const loadContent = contentId =>
  'https://hacker-news.firebaseio.com/v0/item/' + contentId + '.json';

export default async storyId => {
  const story = await axios.get(loadContent(storyId));
  const { by: author, title, score, kids, id, url: storyUrl } = story.data;
  const comment = kids
    ? await axios.get(loadContent(kids[0]))
    : { data: { text: undefined } };

  const obj = Object.assign(
    {},
    {
      author,
      title: DOMPurify.sanitize(title),
      score,
      id,
      storyUrl,
      upvotingUrl: createUpvotingUrl(storyId),
    },
    {
      text:
        comment && comment.data
          ? DOMPurify.sanitize(comment.data.text)
          : undefined,
    }
  );
  return obj;
};
