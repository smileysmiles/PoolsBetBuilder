import axios from 'axios';
import RunnersDAL from './RunnersDAL';
import moment from 'moment';

export default {
    async getRacecard(date){      
        
    },

    getRaces(date){      

        
    },
    async getMeetingRaces(meetinguid){      
        
        try{
            var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/race/' + meetinguid;
            var record = await axios.get(url);
            if(record)
            {
                console.log("getMeetingRaces : Success")
                return record.data.Items;
            }
        }
        catch(error)
        {
            console.log("getRacecard: Fail - " + JSON.stringify(error))
        }

    }
}