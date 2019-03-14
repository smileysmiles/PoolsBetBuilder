import axios from 'axios';
import RunnersDAL from './RunnersDAL';
import moment from 'moment';

export default {
    async getRacecard(date){      
        
        try{
            var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/racecard/' + date + '/Racecard'
            var record = await axios.get(url);
            if(record)
            {
                console.log("getRacecard : Success")
                return record.data.Items[0];
            }
        }
        catch(error)
        {
            console.log("getRacecard: Fail - " + JSON.stringify(error))
        }

    }
}