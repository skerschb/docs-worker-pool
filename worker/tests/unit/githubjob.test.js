
var GitHubBuildComponent = require('../../types/GitHubJob');

const jobPayload = {
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
};

const jobPayloadPublicFork = {
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

describe('GitHubJob Class Tests', () => {
    it('get branch for repo', async () => {
        const githubJob1 = new GitHubBuildComponent(jobPayload);
        console.log(githubJob1.getBranch());
        expect(githubJob1).toBeDefined();
  });
});
