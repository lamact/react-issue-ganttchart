import {
  isGitHubURL,
  getGitHubNameSpaceFromGitURL,
  getGitHubProjectFromGitURL,
  getGitHubAPIURLIssue,
  getGitHubAPIURLIssuebyNumber,
  getGitHubAPIURLIssueFilterd,
  getGitHubAPIURLLabel,
  getGitHubAPIURLCollaborators,
  getGitHubURLIssuebyNumber,
  getGitHubURLNewIssueWithTemplate,
} from './GitHubURLHelper';

describe('isGitHubURL', () => {
  test('true', () => {
    expect(
      isGitHubURL('https://github.com/lamact/react-issue-ganttchart/')
    ).toBe(true);
  });

  test('true', () => {
    expect(
      isGitHubURL('https://github.com/lamact/react-issue-ganttchart')
    ).toBe(true);
  });

  test('true', () => {
    expect(isGitHubURL('https://github.com/xxxxxx/yyyyyyyy/zzzzzzzzz')).toBe(
      true
    );
  });

  test('false', () => {
    expect(
      isGitHubURL('https://gitlab.com/lamact/react-issue-ganttchart/')
    ).toBe(false);
  });

  test('false', () => {
    expect(isGitHubURL('github.com/lamact/react-issue-ganttchart/')).toBe(
      false
    );
  });

  test('false', () => {
    expect(isGitHubURL('https://github.com/')).toBe(false);
  });
});

describe('getGitHubNameSpaceFromGitURL', () => {
  test('true', () => {
    expect(
      getGitHubNameSpaceFromGitURL(
        'https://github.com/lamact/react-issue-ganttchart/'
      )
    ).toBe('lamact');
  });

  test('true', () => {
    expect(
      getGitHubNameSpaceFromGitURL(
        'https://github.com/lamact/react-issue-ganttchart'
      )
    ).toBe('lamact');
  });

  test('true', () => {
    expect(
      getGitHubNameSpaceFromGitURL(
        'https://github.com/xxxxxx/yyyyyyyy/zzzzzzzzz'
      )
    ).toBe('xxxxxx');
  });

  test('null', () => {
    expect(
      getGitHubNameSpaceFromGitURL(
        'https://gitlab.com/lamact/react-issue-ganttchart/'
      )
    ).toBe(null);
  });

  test('true', () => {
    expect(
      getGitHubNameSpaceFromGitURL('github.com/lamact/react-issue-ganttchart/')
    ).toBe(null);
  });

  test('false', () => {
    expect(getGitHubNameSpaceFromGitURL('https://github.com/')).toBe(null);
  });
});

describe('getGitHubProjectFromGitURL', () => {
  test('true', () => {
    expect(
      getGitHubProjectFromGitURL(
        'https://github.com/lamact/react-issue-ganttchart/'
      )
    ).toBe('react-issue-ganttchart');
  });

  test('true', () => {
    expect(
      getGitHubProjectFromGitURL(
        'https://github.com/lamact/react-issue-ganttchart'
      )
    ).toBe('react-issue-ganttchart');
  });

  test('true', () => {
    expect(
      getGitHubProjectFromGitURL('https://github.com/xxxxxx/yyyyyyyy/zzzzzzzzz')
    ).toBe('yyyyyyyy');
  });

  test('null', () => {
    expect(
      getGitHubProjectFromGitURL(
        'https://gitlab.com/lamact/react-issue-ganttchart/'
      )
    ).toBe(null);
  });

  test('false', () => {
    expect(getGitHubProjectFromGitURL('https://github.com/')).toBe(null);
  });
});

describe('getGitHubAPIURLIssue', () => {
  test('true', () => {
    expect(
      getGitHubAPIURLIssue('https://github.com/lamact/react-issue-ganttchart/')
    ).toBe('https://api.github.com/repos/lamact/react-issue-ganttchart/issues');
  });
  test('false', () => {
    expect(
      getGitHubAPIURLIssue('https://github.com/lamact/react-issue-ganttchart/')
    ).toBe('https://api.github.com/repos/lamact/react-issue-ganttchart/issues');
  });
  test('null', () => {
    expect(
      getGitHubAPIURLIssue('https://github.com/lamact/react-issue-ganttchart/')
    ).toBe('https://api.github.com/repos/lamact/react-issue-ganttchart/issues');
  });
});

describe('getGitHubAPIURLIssuebyNumber', () => {
  test('true', () => {
    expect(
      getGitHubAPIURLIssuebyNumber(
        'https://github.com/lamact/react-issue-ganttchart/',
        10
      )
    ).toBe(
      'https://api.github.com/repos/lamact/react-issue-ganttchart/issues/10'
    );
  });
  test('true', () => {
    expect(
      getGitHubAPIURLIssuebyNumber(
        'https://github.com/lamact/react-issue-ganttchart/aaaaa',
        10000
      )
    ).toBe(
      'https://api.github.com/repos/lamact/react-issue-ganttchart/issues/10000'
    );
  });
  test('null', () => {
    expect(
      getGitHubAPIURLIssuebyNumber(
        'https://github.com/lamact/react-issue-ganttchart/',
        null
      )
    ).toBe(null);
  });
});

describe('getGitHubAPIURLIssueFilterd', () => {
  test('true', () => {
    expect(
      getGitHubAPIURLIssueFilterd(
        'https://github.com/lamact/react-issue-ganttchart/',
        [{ id: 1, name: 'todo' }],
        { id: 1, name: 'satoshi' }
      )
    ).toBe(
      'https://api.github.com/repos/lamact/react-issue-ganttchart/issues?labels=todo,&assignee=satoshi'
    );
  });
  test('true', () => {
    expect(
      getGitHubAPIURLIssueFilterd(
        'https://github.com/lamact/react-issue-ganttchart/',
        [
          { id: 1, name: 'todo' },
          { id: 2, name: 'doing' },
          { id: 3, name: 'done' },
        ],
        { id: 1, name: 'satoshi' }
      )
    ).toBe(
      'https://api.github.com/repos/lamact/react-issue-ganttchart/issues?labels=todo,doing,done,&assignee=satoshi'
    );
  });
  test('true', () => {
    expect(
      getGitHubAPIURLIssueFilterd(
        'https://github.com/lamact/react-issue-ganttchart/',
        [{ id: 1, name: 'todo' }],
        []
      )
    ).toBe(
      'https://api.github.com/repos/lamact/react-issue-ganttchart/issues?labels=todo,'
    );
  });
  test('true', () => {
    expect(
      getGitHubAPIURLIssueFilterd(
        'https://github.com/lamact/react-issue-ganttchart/',
        [],
        { id: 1, name: 'satoshi' }
      )
    ).toBe(
      'https://api.github.com/repos/lamact/react-issue-ganttchart/issues?labels=&assignee=satoshi'
    );
  });
  test('true', () => {
    expect(
      getGitHubAPIURLIssueFilterd(
        'https://github.com/lamact/react-issue-ganttchart/',
        [{ id: 1, name: 'todo' }],
        []
      )
    ).toBe(
      'https://api.github.com/repos/lamact/react-issue-ganttchart/issues?labels=todo,'
    );
  });
  test('null', () => {
    expect(
      getGitHubAPIURLIssueFilterd(
        'https://github.com/lamact/react-issue-ganttchart/'
      )
    ).toBe(null);
  });
});

describe('getGitHubAPIURLLabel', () => {
  test('true', () => {
    expect(
      getGitHubAPIURLLabel('https://github.com/lamact/react-issue-ganttchart/')
    ).toBe('https://api.github.com/repos/lamact/react-issue-ganttchart/labels');
  });
  test('false', () => {
    expect(
      getGitHubAPIURLLabel('https://github.com/lamact/react-issue-ganttchart/')
    ).toBe('https://api.github.com/repos/lamact/react-issue-ganttchart/labels');
  });
  test('null', () => {
    expect(
      getGitHubAPIURLLabel('github.com/lamact/react-issue-ganttchart/')
    ).toBe(null);
  });
});

describe('getGitHubAPIURLCollaborators', () => {
  test('true', () => {
    expect(
      getGitHubAPIURLCollaborators(
        'https://github.com/lamact/react-issue-ganttchart/'
      )
    ).toBe(
      'https://api.github.com/repos/lamact/react-issue-ganttchart/collaborators'
    );
  });
  test('false', () => {
    expect(
      getGitHubAPIURLCollaborators(
        'https://github.com/lamact/react-issue-ganttchart/'
      )
    ).toBe(
      'https://api.github.com/repos/lamact/react-issue-ganttchart/collaborators'
    );
  });
  test('null', () => {
    expect(getGitHubAPIURLCollaborators('github.com/lamact')).toBe(null);
  });
});

describe('getGitHubURLIssuebyNumber', () => {
  test('true', () => {
    expect(
      getGitHubURLIssuebyNumber(
        'https://github.com/lamact/react-issue-ganttchart/',
        15
      )
    ).toBe('https://github.com/lamact/react-issue-ganttchart/issues/15');
  });
  test('null', () => {
    expect(
      getGitHubURLIssuebyNumber(
        'https://github.com/lamact/react-issue-ganttchart/',
        '#12'
      )
    ).toBe("https://github.com/lamact/react-issue-ganttchart/issues/12");
  });
  test('null', () => {
    expect(
      getGitHubURLIssuebyNumber(
        'https://github.com/lamact/react-issue-ganttchart/',
        0
      )
    ).toBe(null);
  });
  test('null', () => {
    expect(
      getGitHubURLIssuebyNumber('github.com/lamact/react-issue-ganttchart/', 2)
    ).toBe(null);
  });
});

describe('getGitHubURLNewIssueWithTemplate', () => {
  test('true', () => {
    expect(
      getGitHubURLNewIssueWithTemplate(
        'https://github.com/lamact/react-issue-ganttchart/'
      )
    ).toBe(
      'https://github.com/lamact/react-issue-ganttchart/issues/new?assignees=&labels=&title=&body='
    );
  });
  test('null', () => {
    expect(
      getGitHubURLIssuebyNumber('github.com/lamact/react-issue-ganttchart/')
    ).toBe(null);
  });
});
