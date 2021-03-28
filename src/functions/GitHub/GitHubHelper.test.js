import {
  generateGanttTaskFromGitHub,
  updateGitHubDescriptionStringFromGanttTask,
} from './GitHubHelper';

const description = `\`\`\`yaml
start_date: 2021/2/5
due_date: 2021/2/5
progress: 0.5
parent: 5
\`\`\`

## 概要 
issueの内容
`;

const issue_info = {
  number: 36,
  title: 'テストissueのタイトル',
  assignee: { login: 'satoshi' },
  description: description,
  updated_at:'2021/2/5',
};

const gantt_task = {
  id: '#36',
  text: 'テストissueのタイトル',
  start_date: '2021/2/5',
  due_date: new Date('2021/2/5'),
  duration: 1,
  progress: 0.5,
  assignee: 'satoshi',
  parent: '#5',
  description: description,
  update:'2021/2/5',
};

describe('generateGanttTaskFromGitHub', () => {
  test('true', () => {
    expect(generateGanttTaskFromGitHub(description, issue_info)).toEqual(
      gantt_task
    );
  });
});

describe('updateGitHubDescriptionStringFromGanttTask', () => {
  test('true', () => {
    expect(
      updateGitHubDescriptionStringFromGanttTask(description, gantt_task)
    ).toEqual(description);
  });
});
