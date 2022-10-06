[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/lamact/react-issue-ganttchart)

react-issue-ganttchart
===================

This is a single page application created with React to display github.com / gitlab.com / your-self-host.gitlab.com issues as a Gantt chart.  
Repository URL and personal access token are required, but not the rest.  
No backend is required, and the token is stored in a cookie.  

## Demo
https://lamact.github.io/react-issue-ganttchart/?giturl=https%3A%2F%2Fgithub.com%2Flamact%2Freact-issue-ganttchart&labels=

## Requirements
- Your Repository's Path (github.com / gitlab.com / self-host.gitlab.com)  
  ex) https://github.com/lamact/react-issue-ganttchart

- Personal Access Token:   
  GitHub: https://github.com/settings/tokens/new Scopes: repo, write:discussion, read:org  
  GitLab: https://gitlab.com/-/profile/personal_access_tokens 

## How to start on your server

 - clone the repository or download files
 - install dependencies (nodejs >= 16.10.0)
~~~
yarn install
~~~

 - run server
~~~
yarn start
~~~

- build and deploy for Pages
~~~
yarn deploy
~~~

# Check List
| Domain              | function                     | Result |
| ------------------- | ---------------------------- | ------ |
| github.com          | Public Issues (List&Update)  | ✅      |
| github.com          | Private Issues (List&Update) | ✅      |
| gitlab.com          | Public Issues (List&Update)  | ✅      |
| gitlab.com          | Private Issues (List&Update) | ✅      |
| gitlab.selfhost.com | Public Issues (List&Update)  | -      |
| gitlab.selfhost.com | Private Issues (List&Update) | -      |

We do not test in self-hosted GitLab every time. If you find any problems, please let us know in an Issue.