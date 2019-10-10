require('../../types/githubJob');
const { MongoClient } = require('mongodb');
const mongo = require('../../utils/mongo');

const currentJobPrivateFork = {
    _id: "5d9f6cc61a9bd2eb19ebe2d6",
    title: "Github Push: jwilliams-mongo/mms-docs",
    user: "jwilliams-mongo",
    email: "55147273+jwilliams-mongo@users.noreply.github.com",
    priority: 1,
    status: "completed",
    createdTime: "Thursday, October 10, 2019, 17:39:18 UTC",
    startTime: "Thursday, October 10, 2019, 17:39:20 UTC",
    endTime: "Thursday, October 10, 2019, 17:44:09 UTC",
    numFailures: 0,
    failures: [],
    result: null,
    payload: {
        jobType: "githubPush",
        source: "github",
        action: "push",
        repoName: "mms-docs",
        branchName: "DOCSP-7211A",
        isFork: true,
        private: true,
        isXlarge: true,
        repoOwner: "jwilliams-mongo",
        url: "https://github.com/jwilliams-mongo/mms-docs.git",
        newHead: "33041ba4a84931e46a1f92a0fb57e0a3804de191"
    }
};

const currentJobPublicFork = {
    _id: "5d9f491e5a73421db2ee18b5",
    title: "Github Push: jeff-allen-mongo/docs-charts",
    user: "jeff-allen-mongo",
    email: "jeffrey.allen@10gen.com",
    priority: 1,
    status: "completed",
    createdTime: "Thursday, October 10, 2019, 15:07:10 UTC",
    startTime: "Thursday, October 10, 2019, 15:07:10 UTC",
    endTime: "Thursday, October 10, 2019, 15:08:03 UTC",
    numFailures: 0,
    failures: [],
    result: null,
    payload: {
        jobType: "githubPush",
        source: "github",
        action: "push",
        repoName: "docs-charts",
        branchName: "DOCSP-6815",
        isFork: true,
        private: true,
        isXlarge: false,
        repoOwner: "jeff-allen-mongo",
        url: "https://github.com/jeff-allen-mongo/docs-charts.git",
        newHead: "831d9fb753519acd49aa18869e91269b1e9a4fcf"
    }
}

describe('GitHubJob Class Tests', () => {
    it('get branch for repo', async () => {
        const githubJob1 = new GitHubJob(currentJobPrivateFork);
        console.log(githubJob1.getBranch());
        expect(githubJob1).toBeDefined();
  });
});
