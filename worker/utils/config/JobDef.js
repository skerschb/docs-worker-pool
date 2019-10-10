class JobDefClass {
    constructor(jobDef) {
        if (jobDef === null) throw TypeError('nothing to construct')
        this.jobDef = jobDef;
    }

    async getRun() {
            return this.jobDef.function;
    }

    async getSafe() {
        return this.jobDef.safe;
    }

    async getFile() {
        return this.jobDef.file;
    }
}

module.exports = {
    JobDefClass: JobDefClass
};