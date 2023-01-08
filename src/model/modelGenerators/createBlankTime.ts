
import { v4 as uuidv4 } from "uuid";
import { DayOfWeek } from "../../enums/DayOfWeek";

import type { ITime } from "../domain/ITime";


// This is the default blank time template. It is used to create a new time 
// More caution must be practiced:
//
//   - Upon function call, give a new id
const blankTimeTemplate: ITime = {
    id: uuidv4(),
    
    beginTime: 8,
    endTime: 9,
    dayOfWeek: DayOfWeek.Sunday,
    venue: "",
};


const createBlankTime = (): ITime => {
    return { 
        ...blankTimeTemplate, 
        id: uuidv4(),
    };
};


export default createBlankTime;