var JobLoader = require('../../utils/config/JobLoader');

var testData = [
    {
        "name": "githubPushJob",
        "file": "githubPushJob.js",
        "function": "runGithubPush",
        "safe": "safeGithubPush"
    },
    {
        "name": "deployProdJob",
        "file": "deployProdJob.js",
        "function": "rundeployProd",
        "safe": "safeDeployProd"
    }
]

let checkResults = [];

beforeAll(() => {
    let arrayTest = JSON.parse(JSON.stringify(testData));
    JobLoader.load = jest.fn().mockReturnValue(arrayTest);
    JobLoader.getConfiguredJobs().then((output) => {
        checkResults = output;
    });
  });

describe('Jobloader Tests', () => {
    it('get jobs for pool', async () => {
        //expect(JobLoader.getConfiguredJobs()).toBeDefined();
        await expect(checkResults.length).toBe(2);         
    });
    
    it('check results', async () => {
        await expect(checkResults[0].getRun()).resolves.toEqual('runGithubPush');
    });

    it('check deploy results', async () => {
        await expect(checkResults[1].getRun()).resolves.toEqual('rundeployProd');
    });

    it('check safe results', async () => {
        await expect(checkResults[1].getSafe()).resolves.toEqual('safeDeployProd');
    });
});
