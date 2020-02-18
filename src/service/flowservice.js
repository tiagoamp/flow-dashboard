//const data = require('../repository/data_original.json');

const service = {

    getProjectInfo: (data) => {
        return {
            project: data.project, 
            holidays: data.holidays.map(h => new Date(h)),
            statusList: data.statusList,
            milestones: data.milestones,
            actions: data.actions,
            risks: data.risks,
            items: data.items
        };
    },

    getSortedDatesFromItems: (items) => {
        const statusHistoryArr = items.map(item => item.statusHistory);
        const datesStrArrays = statusHistoryArr.map(statusArr => statusArr.map(obj => obj.date));
        const datesStrFlatArr = datesStrArrays.reduce((acc, x) => acc.concat(x), []);
        const onlyUnique = (value, index, self) => self.indexOf(value) === index;
        const distinctDatesStrArr = datesStrFlatArr.filter(onlyUnique);
        const datesArr = distinctDatesStrArr.map(str => new Date(str));
        const sortedDates = datesArr.sort((a,b) => a - b);
        return sortedDates;
    },

}

export default service;