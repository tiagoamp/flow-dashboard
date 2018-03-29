export class ItemDao {

    getAll() {        
        return this._stubList();
    }

    getStatusList() {
        return this._stubStatusList();
    }

    _stubStatusList() {
        return ['INBOX','TO DO','DOING','BLOCKED','DONE','RELEASED'];
    }

    _stubList() {
        return [
            { id:1, status: "INBOX", label: "Label 01", description: "Item 01", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: new Date(2018, 0, 1) } ] },
            { id:2, status: "INBOX", label: "Label 02", description: "Item 02", statusHistory: [ {status: "INBOX", moved: new Date(2018,0,1)} ] },
            { id:3, status: "INBOX", label: "Label 03", description: "Item 03", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: new Date(2018,0,5)} ] },

            { id:4, status: "TO DO", description: "Item 04 description", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: new Date(2018,0,5)}, 
                                                                                                     {status: "TO DO", moved: new Date(2018,0,22)} ] },
            { id:5, status: "TO DO", description: "Item 05", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: new Date(2018,0,5)}, 
                                                                                                     {status: "TO DO", moved: new Date(2018,0,22)} ] },

            { id:6, status: "DOING", description: "Item 06 description", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: new Date(2018,0,5)}, 
                                                                                                     {status: "TO DO", moved: new Date(2018,0,20)}, 
                                                                                                     {status: "DOING", moved: new Date(2018,1,5)} ] },

            { id:7, status: "DOING", description: "Item 07", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: new Date(2018,0,1)}, 
                                                                                                     {status: "TO DO", moved: new Date(2018,0,11)}, 
                                                                                                     {status: "DOING", moved: new Date(2018,1,6)}, 
                                                                                                     {status: "DONE", moved: new Date(2018,1,20)} ] },
            { id:8, status: "DOING", description: "Item 08", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: new Date(2018,0,2)}, 
                                                                                                     {status: "TO DO", moved: new Date(2018,0,11)}, 
                                                                                                     {status: "DOING", moved: new Date(2018,1,5)}, 
                                                                                                     {status: "DONE", moved: new Date(2018,1,22)} ] },

            { id:9, status: "BLOCKED", description: "Item 09", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: new Date(2018,0,1)}, 
                                                                                                       {status: "TO DO", moved: new Date(2018,0,11)}, 
                                                                                                       {status: "DOING", moved: new Date(2018,1,5)}, 
                                                                                                       {status: "BLOCKED", moved: new Date(2018,1,15)} ] },

            { id:10, status: "DONE", description: "Item 10", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: new Date(2018,0,1)}, 
                                                                                                       {status: "TO DO", moved: new Date(2018,0,10)}, 
                                                                                                       {status: "DOING", moved: new Date(2018,1,1)}, 
                                                                                                       {status: "DONE", moved: new Date(2018,1,15)}, ] },
            { id:11, status: "DONE", description: "Item 11", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: new Date(2018,0,1)}, 
                                                                                                       {status: "TO DO", moved: new Date(2018,0,10)}, 
                                                                                                       {status: "DOING", moved: new Date(2018,1,1)}, 
                                                                                                       {status: "DONE", moved: new Date(2018,1,16)}, ] },                                                                

            { id:12, status: "RELEASED", description: "Item 12", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: new Date(2018,0,9)}, 
                                                                                                        {status: "TO DO", moved: new Date(2018,0,11)}, 
                                                                                                        {status: "DOING", moved: new Date(2018,1,5)}, 
                                                                                                        {status: "DONE", moved: new Date(2018,1,10)}, 
                                                                                                        {status: "RELEASED", moved: new Date(2018,1,26)} ] },
            { id:13, status: "RELEASED", description: "Item 13", points: 5, percent: 0, statusHistory: [ {status: "INBOX", moved: new Date(2018,0,9)}, 
                                                                                                        {status: "TO DO", moved: new Date(2018,0,11)}, 
                                                                                                        {status: "DOING", moved: new Date(2018,1,5)}, 
                                                                                                        {status: "DONE", moved: new Date(2018,1,14)}, 
                                                                                                        {status: "RELEASED", moved: new Date(2018,1,26)} ] },
        ];
    }
  
}

/*

DDL: 

mysql> CREATE TABLE ITEMS ( 
    -> ID INT(11) NOT NULL AUTO_INCREMENT,
    -> STATUS VARCHAR(40), 
    -> LABEL VARCHAR(40), 
    -> DESCRIPTION VARCHAR(255), 
    -> POINTS INT(5), 
    -> PERCENT INT(3), 
    -> PRIMARY KEY(ID)
    -> );

mysql> CREATE TABLE ITEMS_HISTORY (
    -> ID_HISTORY INT(11) NOT NULL AUTO_INCREMENT, 
    -> STATUS VARCHAR(40),    
    -> ID INT(11), 
    -> MOVED DATE,
    -> PRIMARY KEY(ID_HISTORY)
    -> );

*/