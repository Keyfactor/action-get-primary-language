


const fs = require('fs');
const core = require('@actions/core');
const { context } = require('@actions/github');
const { Octokit } = require('@octokit/rest');
// todo: add override for json property
// const jsonPath = core.getInput('input-file');
const token = core.getInput('token');

const octokit = new Octokit({ auth: token });
const { owner, repo } = context.repo;
console.log(`owner: ${owner}, repo: ${repo}`)


async function findPrimaryLanguage() {
  try {
    const { data: languages } = await octokit.request('GET /repos/{owner}/{repo}/languages', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    let maxPercentage = 0;
    let maxLanguage = '';

    for (const [language, bytes] of Object.entries(languages)) {
      const percentage = (bytes / Object.values(languages).reduce((a, b) => a + b, 0)) * 100;
      if (percentage > maxPercentage) {
        maxPercentage = percentage;
        maxLanguage = language;
      }
    }

    if (maxLanguage) {
      console.log(`The primary language is ${maxLanguage} with ${maxPercentage.toFixed(2)}% usage.`);
      core.setOutput('primary_language', maxLanguage);
    } else {
      console.log('No language data found for the repository.');
    }
  } catch (error) {
    console.error("An error occurred: ", error);
  }
}

findPrimaryLanguage()