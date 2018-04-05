import $ from 'jquery'; 

export class FlowApiService {

    getAll() {
        // $.ajax({
        //     url: "http://localhost:3001/items",
        //     dataType: 'json',
        //     success: function(resp) {
        //         this.setState( {itemsList: resp, statusList: statuses} );
        //     }.bind(this)
        // });
    }

    getStatusList() {
        return ['INBOX','TO DO','DOING','DONE','RELEASED'];       
    }

}