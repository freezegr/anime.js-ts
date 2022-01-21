import { getMangaList } from '../src';

describe('blah', () => {
  it('works', () => {
    getMangaList("Aarana").then(res => res.reading)
  });
});
