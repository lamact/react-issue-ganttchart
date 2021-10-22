import {
  getSelfHostingGitLabDomain,
  isGitLabURL,
  getGitLabDomain,
  getGitLabURL,
  getGitLabAPIURL,
  getGitLabNameSpaceFromGitURL,
  getGitLabProjectFromGitURL,
  getGitLabAPIURLIssueFilterd,
  getGitabAPIURLIssuebyNumber,
  getGitLabAPIURLLabel,
  getGitLabAPIURLMember,
  getGitLabURLIssuebyNumber,
  getGitLabURLNewIssueWithTemplate,
} from './GitLabURLHelper';

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

describe('getSelfHostingGitLabDomain', () => {
  test('true', () => {
    expect(
      getSelfHostingGitLabDomain(
        'https://example.gitlab.com/lamact/react-issue-ganttchart/'
      )
    ).toBe('example.gitlab.com');
  });
  test('true', () => {
    expect(
      getSelfHostingGitLabDomain(
        'https://gitlab.com/lamact/react-issue-ganttchart/'
      )
    ).toBe('gitlab.com');
  });
  test('null', () => {
    expect(
      getSelfHostingGitLabDomain(
        'https://github.com/lamact/react-issue-ganttchart/'
      )
    ).toBe(null);
  });
  test('null', () => {
    expect(
      getSelfHostingGitLabDomain('hub.com/lamact/react-issue-ganttchart/')
    ).toBe(null);
  });
  test('null', () => {
    expect(getSelfHostingGitLabDomain('https://gitlab.com')).toBe(null);
  });
});

describe('getGitLabDomain', () => {
  test('true', () => {
    expect(
      getGitLabDomain(
        'https://example.gitlab.com/lamact/react-issue-ganttchart/'
      )
    ).toBe('https://example.gitlab.com/');
  });
  test('true', () => {
    expect(
      getGitLabDomain('https://gitlab.com/lamact/react-issue-ganttchart/')
    ).toBe('https://gitlab.com/');
  });
  test('null', () => {
    expect(getGitLabDomain('htttlab.com/lamact/react-issue-ganttchart/')).toBe(
      null
    );
  });
});

describe('getGitLabURL', () => {
  test('true', () => {
    expect(
      getGitLabURL('https://gitlab.com/lamact/react-issue-ganttchart/')
    ).toBe('https://gitlab.com/');
  });
  test('true', () => {
    expect(
      getGitLabURL('https://gitlab.com/lamact/react-issue-ganttchart/')
    ).toBe('https://gitlab.com/');
  });
  test('null', () => {
    expect(getGitLabURL('htttlab.com/lamact/react-issue-ganttchart/')).toBe(
      null
    );
  });
});

describe('getGitLabAPIURL', () => {
  test('true', () => {
    expect(
      getGitLabAPIURL('https://gitlab.com/lamact/react-issue-ganttchart/')
    ).toBe('https://gitlab.com/api/v4/');
  });
  test('true', () => {
    expect(
      getGitLabAPIURL(
        'https://example.gitlab.com/lamact/react-issue-ganttchart/'
      )
    ).toBe('https://example.gitlab.com/api/v4/');
  });
  test('null', () => {
    expect(getGitLabAPIURL('htttlab.com/lamact/react-issue-ganttchart/')).toBe(
      null
    );
  });
});

describe('getGitLabNameSpaceFromGitURL', () => {
  test('true', () => {
    expect(
      getGitLabNameSpaceFromGitURL(
        'https://gitlab.com/lamact/react-issue-ganttchart/'
      )
    ).toBe('lamact');
  });
  test('true', () => {
    expect(
      getGitLabNameSpaceFromGitURL(
        'https://ex.gitlab.com/lamact/react-issue-ganttchart/'
      )
    ).toBe('lamact');
  });
  test('null', () => {
    expect(
      getGitLabNameSpaceFromGitURL(
        'htts://gitab.com/lamact/react-issue-ganttchart/'
      )
    ).toBe(null);
  });
  test('null', () => {
    expect(getGitLabNameSpaceFromGitURL('https://ex.gitlab.com')).toBe(null);
  });
});

describe('getGitLabProjectFromGitURL', () => {
  test('true', () => {
    expect(
      getGitLabProjectFromGitURL(
        'https://gitlab.com/lamact/react-issue-ganttchart/'
      )
    ).toBe('react-issue-ganttchart');
  });
  test('true', () => {
    expect(
      getGitLabProjectFromGitURL(
        'https://ex.gitlab.com/lamact/react-issue-ganttchart/'
      )
    ).toBe('react-issue-ganttchart');
  });
  test('null', () => {
    expect(
      getGitLabProjectFromGitURL('httitab.com/lamact/react-issue-ganttchart/')
    ).toBe(null);
  });
  test('null', () => {
    expect(getGitLabProjectFromGitURL('https://ex.gitlab.com')).toBe(null);
  });
});

describe('getGitLabAPIURLIssueFilterd', () => {
  test('true', () => {
    expect(
      getGitLabAPIURLIssueFilterd(
        'https://gitlab.com/lamact/react-issue-ganttchart/',
        'privateaccesstoken',
        [
          { id: 123, name: 'Todo' },
          { id: 124, name: 'Doing' },
        ],
        { id: 12, name: 'satoshi' }
      )
    ).toBe(
      'https://gitlab.com/api/v4/projects/lamact%2Freact-issue-ganttchart/issues?access_token=privateaccesstoken&labels=Todo,Doing,&assignee_id=12&per_page=100&state=opened'
    );
  });
  test('null', () => {
    expect(
      getGitLabAPIURLIssueFilterd(
        'notvalidurl',
        'privateaccesstoken',
        [
          { id: 123, name: 'Todo' },
          { id: 124, name: 'Doing' },
        ],
        { id: 12, name: 'satoshi' }
      )
    ).toBe(null);
  });
  test('null', () => {
    expect(
      getGitLabAPIURLIssueFilterd(
        null,
        'privateaccesstoken',
        [
          { id: 123, name: 'Todo' },
          { id: 124, name: 'Doing' },
        ],
        { id: 12, name: 'satoshi' }
      )
    ).toBe(null);
  });
  test('null', () => {
    expect(
      getGitLabAPIURLIssueFilterd(
        'https://gitlab.com/lamact/react-issue-ganttchart/',
        null,
        [
          { id: 123, name: 'Todo' },
          { id: 124, name: 'Doing' },
        ],
        { id: 12, name: 'satoshi' }
      )
    ).toBe(null);
  });
  test('null', () => {
    expect(
      getGitLabAPIURLIssueFilterd(
        'https://gitlab.com/lamact/react-issue-ganttchart/',
        'privateaccesstoken',
        null,
        { id: 12, name: 'satoshi' }
      )
    ).toBe(null);
  });
  test('null', () => {
    expect(
      getGitLabAPIURLIssueFilterd(
        'https://gitlab.com/lamact/react-issue-ganttchart/',
        'privateaccesstoken',
        [
          { id: 123, name: 'ToDo' },
          { id: 124, name: 'Doing' },
        ],
        null
      )
    ).toBe(null);
  });
  test('null', () => {
    expect(
      getGitLabAPIURLIssueFilterd(
        'https://gitlab.com/lamact/react-issue-ganttchart/',
        'privateaccesstoken',
        [
          { id: 123, name: 'ToDo' },
          { id: 124, name: 'Doing' },
        ],
        { name: 'satoshi' }
      )
    ).toBe(null);
  });
});

describe('getGitabAPIURLIssuebyNumber', () => {
  test('true', () => {
    expect(
      getGitabAPIURLIssuebyNumber(
        'https://gitlab.com/lamact/react-issue-ganttchart/',
        'privateaccesstoken',
        325
      )
    ).toBe(
      'https://gitlab.com/api/v4/projects/lamact%2Freact-issue-ganttchart/issues/325?access_token=privateaccesstoken'
    );
  });
  test('null', () => {
    expect(
      getGitabAPIURLIssuebyNumber(
        'httpm/lamact/react-issue-ganttchart/',
        'privateaccesstoken',
        325
      )
    ).toBe(null);
  });
  test('null', () => {
    expect(
      getGitabAPIURLIssuebyNumber(
        'https://gitlab.com/lamact/react-issue-ganttchart/',
        null,
        325
      )
    ).toBe(null);
  });
  test('null', () => {
    expect(
      getGitabAPIURLIssuebyNumber(
        'https://gitlab.com/lamact/react-issue-ganttchart/',
        'privateaccesstoken',
        null
      )
    ).toBe(null);
  });
});

describe('getGitLabAPIURLLabel', () => {
  test('true', () => {
    expect(
      getGitLabAPIURLLabel(
        'https://gitlab.com/lamact/react-issue-ganttchart/',
        'privateaccesstoken'
      )
    ).toBe(
      'https://gitlab.com/api/v4/projects/lamact%2Freact-issue-ganttchart/labels?access_token=privateaccesstoken&per_page=100'
    );
  });
  test('null', () => {
    expect(
      getGitLabAPIURLLabel(
        'httom/lamact/react-issue-ganttchart/',
        'privateaccesstoken'
      )
    ).toBe(null);
  });
});

describe('getGitLabAPIURLMember', () => {
  test('true', () => {
    expect(
      getGitLabAPIURLMember(
        'https://gitlab.com/lamact/react-issue-ganttchart/',
        'privateaccesstoken'
      )
    ).toBe(
      'https://gitlab.com/api/v4/groups/lamact/members/all?access_token=privateaccesstoken&per_page=200'
    );
  });
  test('null', () => {
    expect(
      getGitLabAPIURLMember(
        'httom/lamact/react-issue-ganttchart/',
        'privateaccesstoken'
      )
    ).toBe(null);
  });
});

describe('getGitLabURLIssuebyNumber', () => {
  test('true', () => {
    expect(
      getGitLabURLIssuebyNumber(
        'https://gitlab.com/lamact/react-issue-ganttchart/',
        43
      )
    ).toBe(
      'https://gitlab.com/lamact/react-issue-ganttchart/-/issues/43'
    );
  });
  test('null', () => {
    expect(
      getGitLabURLIssuebyNumber('httom/lamact/react-issue-ganttchart/', 43)
    ).toBe(null);
  });
});


describe('getGitLabURLNewIssueWithTemplate', () => {
  test('true', () => {
    expect(
      getGitLabURLNewIssueWithTemplate(
        'https://gitlab.com/lamact/react-issue-ganttchart/'
      )
    ).toBe(
      'https://gitlab.com/lamact/react-issue-ganttchart/issues/new?issue[description]='
    );
  });
  test('null', () => {
    expect(
      getGitLabURLNewIssueWithTemplate('httom/lamact/react-issue-ganttchart/')
    ).toBe(null);
  });
});
