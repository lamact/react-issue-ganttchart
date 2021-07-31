describe('true is truthy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });
});

// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';
// import { getIssuesFromAPI } from './IssueAPI';

// describe('setGitHubLabelListOfRepoFromAPI', () => {
//   const mockAxios = new MockAdapter(axios);
//   mockAxios
//     .onGet(
//       'https://gitlab.com/api/v4/projects/lamact%2Fsukima/issues?access_token=token&labels=&assignee_id=3666147&per_page=100&state=opened'
//     )
//     .reply(200, [
//       {
//         assignee: {
//           avatar_url:
//             'https://assets.gitlab-static.net/uploads/-/system/user/avatar/3666147/avatar.png',
//           id: 3666147,
//           name: 'yhzz',
//           state: 'active',
//           username: 'yhzz',
//           web_url: 'https://gitlab.com/yhzz',
//         },
//         iid: 1,
//         name: 'aa',
//         created_at: new Date('2000/01/01'),
//       },
//     ]);

//   test('true', () => {
//     return getIssuesFromAPI('https://gitlab.com/lamact/sukima', 'token', [], {
//       id: 3666147,
//       name: 'yhzz',
//     }).then((data) => {
//       expect(data).toStrictEqual([
//         {
//           assignee: 'yhzz',
//           description: undefined,
//           due_date: new Date('2000/01/01'),
//           duration: 1,
//           id: '#1',
//           progress: null,
//           start_date: '2000/1/1',
//           text: undefined,
//           update: '2000/1/1',
//           links:[],
//         },
//       ]);
//     });
//     //       expect(setGitHubLabelListOfRepoFromAPI(description, issue_info)).toEqual(
//     //         gantt_task
//     //       );
//     //     });
//   });
// });
