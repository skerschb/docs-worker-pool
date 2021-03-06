const job = require('../jobTypes/githubPushJob');
const workerUtils = require('../utils/utils');

describe('Test Class', () => {
    // Dont actually reset the directory and dont care about the logging
    beforeAll(() => {
        workerUtils.resetDirectory = jest.fn().mockResolvedValue();
        workerUtils.logInMongo = jest.fn().mockResolvedValue();
        jest.useFakeTimers();
    });

    // Tests for gatsbyBuild() function
    it('gatsbyBuild() resolves properly', async () => {
        const execMock = jest.fn().mockResolvedValue();
        workerUtils.getExecPromise = jest.fn().mockReturnValue(execMock);
        await expect(job.gatsbyBuild()).resolves.toBeUndefined();
    });

    it('gatsbyBuild() rejects properly', async () => {
        const execMock = jest.fn().mockRejectedValue({ killed: true });
        workerUtils.getExecPromise = jest.fn().mockReturnValue(execMock);
        await expect(job.gatsbyBuild()).rejects.toEqual({ killed: true });
    });

    it('gatsbyBuild() rejects properly', async () => {
        const execMock = jest.fn().mockRejectedValue({ code: true });
        workerUtils.getExecPromise = jest.fn().mockReturnValue(execMock);
        await expect(job.gatsbyBuild()).rejects.toEqual({ code: true });
    });

    it('gatsbyBuild() rejects properly', async () => {
        const execMock = jest.fn().mockRejectedValue({ signal: true });
        workerUtils.getExecPromise = jest.fn().mockReturnValue(execMock);
        await expect(job.gatsbyBuild()).rejects.toEqual({ signal: true });
    });

    it('gatsbyBuild() resolves properly', async () => {
        const execMock = jest.fn().mockRejectedValue({ notSignal: true });
        workerUtils.getExecPromise = jest.fn().mockReturnValue(execMock);
        await expect(job.gatsbyBuild()).resolves.toBeUndefined();
    });

    // Tests for RunGithubPush Function
    it('runGithubPush(): Everything resolves --> should work', async () => {
        job.gatsbyBuild = jest.fn().mockResolvedValue();
        workerUtils.uploadDirectoryToS3Bucket = jest.fn().mockResolvedValue();

        await expect(job.runGithubPush({})).resolves.toBeUndefined();
        jest.runAllTimers();

        expect(job.gatsbyBuild).toHaveBeenCalledTimes(1);
        expect(workerUtils.uploadDirectoryToS3Bucket).toHaveBeenCalledTimes(1);
    });

    it('runGithubPush(): If gatsby build fails --> should reject', async () => {
        job.gatsbyBuild = jest.fn().mockRejectedValue('gatsby failed');
        workerUtils.uploadDirectoryToS3Bucket = jest.fn().mockResolvedValue();

        await expect(job.runGithubPush({})).rejects.toEqual('gatsby failed');

        expect(job.gatsbyBuild).toHaveBeenCalledTimes(1);
        expect(workerUtils.uploadDirectoryToS3Bucket).toHaveBeenCalledTimes(0);
    });

    it('runGithubPush(): If aws putObject fails --> should reject', async () => {
        job.gatsbyBuild = jest.fn().mockResolvedValue();
        workerUtils.uploadDirectoryToS3Bucket = jest.fn().mockRejectedValue('s3 failed');

        await expect(job.runGithubPush({})).rejects.toEqual('s3 failed');

        expect(job.gatsbyBuild).toHaveBeenCalledTimes(1);
        expect(workerUtils.uploadDirectoryToS3Bucket).toHaveBeenCalledTimes(1);
    });
});
