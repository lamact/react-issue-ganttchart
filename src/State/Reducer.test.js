import { handleOpenIssueAtBrowser } from "./Reducer";


const initialState = {
  currentZoom: 'Weeks',
  update: 0,
  git_url: '',
  token: 'Tokens that have not yet been entered',
  labels: [],
  selected_labels: [],
  member_list: [],
  selected_assignee: {},
};

describe('handleOpenIssueAtBrowser', () => {
  test('true', () => {
    expect(handleOpenIssueAtBrowser(initialState, {value: "A"})).toEqual(
      initialState
    );
  });
});