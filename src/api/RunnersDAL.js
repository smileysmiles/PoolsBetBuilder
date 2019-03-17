import axios from 'axios'

export default {
    async getRaceRunners( raceuid ){
        try
        {
            var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/runner/' + raceuid;
            var records = await axios.get(url);
            if(records)
            {
                console.log("getRunner : Success");
                return records.data.Items;
            }
        }
        catch(error)
        {
            console.log("getRunner : Failed - " + error );
        }
    },
    async getRunners(date){      
        
        try{
            var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/racecard/' + date + '/Runner'
            var record = await axios.get(url);
            if(record)
            {
                console.log("getRunners : Success")
                return record.data.Items;
            }
        }
        catch(error)
        {
            console.log("getRunners: Fail - " + JSON.stringify(error))
        }

    },
}
