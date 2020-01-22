const data = require('../repository/data.json');

const service = {

    getProjectInfo: () => {
        return {
            project: data.project, 
            statusList: data.statusList,
            items: data.items
        };
    }

}

export default service;