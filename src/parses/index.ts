import lessParse from './less';
import sassParse from './sass';
import cssParse from './css';

const map = new Map();

map.set('.scss', sassParse);
map.set('.less', lessParse);
map.set('.sass', sassParse);
map.set('.css', cssParse);

export default {
  get: map.get.bind(map),
  has: map.has.bind(map),
  set: map.set.bind(map),
  clear: map.clear.bind(map)
};
