// Imports
const path = require('path');
const fs = require('fs-extra');
// const git  = require("nodegit");
const { promisify } = require('util');
const utils = require('../utils');
const exec = promisify(require('child_process').exec);
const mongo = require('./mongo');

module.exports = {

  /**  "payload": {
    "jobType": "githubPush",
    "source": "github",
    "action": "push",
    "repoName": "baas-docs",
    "branchName": "testbranch",
    "isFork": true,
    "private": false,
    "isXlarge": false,
    "scope": "world|repo|commit",
    "commit": "commit_hash",
    "repoOwner": "tkaye407",
    "url": "https://github.com/tkaye407/baas-docs.git",
    "newHead": "2812478fa11447ac7bc817bc847a6e9f53978a70"
  }**/
  
    async expandBuild(currentJob, scope) {
        if (scope)
        {
            let buildBranches = [];
            let repos = [];
            if (scope === 'world') {
                //getAllRepos/branches
                repos = utils.getAllRepos();
            } else if (scope === 'repo') {
                repos.push(currentJob.payload.
            }
            for (let repo in repos) {
                buildBranches.push(repo);
            }
        }



    await mongo.populateCommunicationMessageInMongo(currentJob, message);
  },
  
};
