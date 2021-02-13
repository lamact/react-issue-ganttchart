import { isGitLabURL } from './GitLabURLHelper';

describe('isGitLabURL', () => {
  test('true', () => {
    expect(
      isGitLabURL('https://gitlab.com/lamact/react-issue-ganttchart/')
    ).toBe(true);
  });

  test('true', () => {
    expect(
      isGitLabURL('https://gitlab.com/lamact/react-issue-ganttchart')
    ).toBe(true);
  });

  test('true', () => {
    expect(isGitLabURL('https://gitlab.com/xxxxxx/yyyyyyyy/zzzzzzzzz')).toBe(
      true
    );
  });

  test('false', () => {
    expect(
      isGitLabURL('https://github.com/lamact/react-issue-ganttchart/')
    ).toBe(false);
  });

  test('false', () => {
    expect(isGitLabURL('gitlab.com/lamact/react-issue-ganttchart/')).toBe(
      false
    );
  });

  test('false', () => {
    expect(isGitLabURL('https://gitlab.com/')).toBe(false);
  });
});
