import React from 'react';
import axios from 'axios';

jest.mock('axios');

// describe('setGitHubLabelListOfRepoFromAPI', () => {
//   test('true', async () => {
//     const stories = [
//       { objectID: '1', title: 'Hello' },
//       { objectID: '2', title: 'React' },
//     ];

//     axios.get.mockImplementationOnce(() =>
//       Promise.resolve({ data: { hits: stories } })
//     );

//     test('true', () => {
//       expect(setGitHubLabelListOfRepoFromAPI(description, issue_info)).toEqual(
//         gantt_task
//       );
//     });
//   });
// });

describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});