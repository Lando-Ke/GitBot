## GitBot
A Simple Facebook messenger chatbot that searches Gitbub repositories for you

##What can it do?
- Search Github
- Fetch the five most stared repositories based on your search query

##What I used
- NodeJS 4.3 to write webhook function
- Serverless framework to deploy AWS lambda functions and endpoints
- axios, promise based HTTP client

##Process
- Create the Facebook app
- Add Facebook app to webhook function by updating s-function.json and handler.js
- Create Facebook page ->authentication Token
- Issue GET request to GitHub API to search for repos||in handler.js
- Deploy!

##Most Challenging
Working with AWS lambda and the serverless framework



