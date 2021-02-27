import MockAdapter from "axios-mock-adapter";
import axios from 'axios';


describe('setGitHubLabelListOfRepoFromAPI', () => {
  const mockAxios = new MockAdapter(axios);
  mockAxios.onGet("https://api.github.com/repos/lamact/react-issue-ganttchart/labels").reply(200, 
      [{ id: 1, name: "aa" }],);

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
});
