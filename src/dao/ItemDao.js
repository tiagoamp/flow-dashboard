export class ItemDao {

    getAll() {        
        return this.stubList();
    }

    stubList() {
        return [
            { id:1, status: "INBOX", label: "Label 01", description: "Item 01", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: "2018-01-01T08:00:00"} ] },
            { id:2, status: "INBOX", label: "Label 02", description: "Item 02", statusHistory: [ {status: "INBOX", moved: "2018-01-01T08:00:00"} ] },
            { id:3, status: "INBOX", label: "Label 03", description: "Item 03", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: "2018-01-03T08:00:00"} ] },

            { id:4, status: "TO DO", description: "Item 04", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: "2018-01-04T08:00:00"}, 
                                                                                                     {status: "TO DO", moved: "2018-01-22T08:00:00"} ] },
            { id:5, status: "TO DO", description: "Item 05", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: "2018-01-05T08:00:00"}, 
                                                                                                     {status: "TO DO", moved: "2018-01-23T08:00:00"} ] },

            { id:6, status: "DOING", description: "Item 06", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: "2018-01-07T08:00:00"}, 
                                                                                                     {status: "TO DO", moved: "2018-01-20T08:00:00"}, 
                                                                                                     {status: "DOING", moved: "2018-02-06T08:00:00"} ] },

            { id:7, status: "DOING", description: "Item 07", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: "2018-01-01T08:00:00"}, 
                                                                                                     {status: "TO DO", moved: "2018-01-12T08:00:00"}, 
                                                                                                     {status: "DOING", moved: "2018-02-04T08:00:00"}, 
                                                                                                     {status: "DONE", moved: "2018-02-20T08:00:00"} ] },

            { id:8, status: "BLOCKED", description: "Item 08", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: "2018-01-01T08:00:00"}, 
                                                                                                       {status: "TO DO", moved: "2018-01-10T08:00:00"}, 
                                                                                                       {status: "DOING", moved: "2018-02-01T08:00:00"}, 
                                                                                                       {status: "BLOCKED", moved: "2018-02-15T08:00:00"} ] },

            { id:9, status: "DONE", description: "Item 09", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: "2018-01-01T08:00:00"}, 
                                                                                                       {status: "TO DO", moved: "2018-01-10T08:00:00"}, 
                                                                                                       {status: "DOING", moved: "2018-02-01T08:00:00"}, 
                                                                                                       {status: "DONE", moved: "2018-02-15T08:00:00"}, ] },                                                                

            { id:10, status: "RELEASED", description: "Item 10", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: "2018-01-09T08:00:00"}, 
                                                                                                        {status: "TO DO", moved: "2018-01-10T08:00:00"}, 
                                                                                                        {status: "DOING", moved: "2018-02-02T08:00:00"}, 
                                                                                                        {status: "DONE", moved: "2018-02-10T08:00:00"}, 
                                                                                                        {status: "RELEASED", moved: "2018-02-26T08:00:00"} ] },
        ];
    }
  
}