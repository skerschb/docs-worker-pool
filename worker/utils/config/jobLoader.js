const fs = require('fs');
const JobDef = require('../../utils/config/JobDef').JobDefClass;

const file = require('path').resolve(__dirname, '../../../jobDefs.json');


async function load() {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

async function getConfiguredJobs() {
    let contentsArray = await this.load();
    var jobDefList = [];
    contentsArray.forEach(function (item, index) {
        jobDefList.push(new JobDef(item));
      });
    return jobDefList;
}

module.exports = {
    getConfiguredJobs: getConfiguredJobs,
    load: load
}