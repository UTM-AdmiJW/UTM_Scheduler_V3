
/**
 * When rendering the class slots onto the timetable, there are several properties that has to be taken 
 * into account for each IEditableCourse:
 * 
 *  1. Course name
 *  2. Course code + Section no
 *  3. Lecturer's name
 *  4. Venue
 * 
 * Some of them might be absent (empty string), and it shall not be rendered onto the timetable.
 * Therefore, in such cases, we have to distribute the remaining space to the rest.
 * 
 * The most straightforward way to do this is by enumerating all possible combinations of the above,
 * which is 2^4 = 16.
 * 
 * I will use bitmasking to do this.
 */


interface IClassSlotRatioParams {
    courseName: string;
    courseCode: string;
    sectionNo: number;
    lecturer: string;
    venue: string;
}


const COURSENAME_MASK = 0b0001;
const COURSECODE_SECTIONNO_MASK = 0b0010;
const LECTURERNAME_MASK = 0b0100;
const VENUE_MASK = 0b1000;


const bitMaskToClassSlotRatio: { [mask: number]: { 
    courseName: number, 
    courseCodeSectionNo: number, 
    lecturer: number, 
    venue: number 
}} = {
    0b0000: { courseName: 0, courseCodeSectionNo: 0, lecturer: 0, venue: 0 },
    0b0001: { courseName: 1, courseCodeSectionNo: 0, lecturer: 0, venue: 0 },
    0b0010: { courseName: 0, courseCodeSectionNo: 1, lecturer: 0, venue: 0 },
    0b0011: { courseName: 0.8, courseCodeSectionNo: 0.2, lecturer: 0, venue: 0 },
    0b0100: { courseName: 0, courseCodeSectionNo: 0, lecturer: 1, venue: 0 },
    0b0101: { courseName: 0.6, courseCodeSectionNo: 0, lecturer: 0.4, venue: 0 },
    0b0110: { courseName: 0, courseCodeSectionNo: 0.5, lecturer: 0.5, venue: 0 },
    0b0111: { courseName: 0.6, courseCodeSectionNo: 0.2, lecturer: 0.2, venue: 0 },
    0b1000: { courseName: 0, courseCodeSectionNo: 0, lecturer: 0, venue: 1 },
    0b1001: { courseName: 0.7, courseCodeSectionNo: 0, lecturer: 0, venue: 0.3 },
    0b1010: { courseName: 0, courseCodeSectionNo: 0.5, lecturer: 0, venue: 0.5 },
    0b1011: { courseName: 0.5, courseCodeSectionNo: 0.2, lecturer: 0, venue: 0.3 },
    0b1100: { courseName: 0, courseCodeSectionNo: 0, lecturer: 0.5, venue: 0.5 },
    0b1101: { courseName: 0.5, courseCodeSectionNo: 0, lecturer: 0.2, venue: 0.3 },
    0b1110: { courseName: 0, courseCodeSectionNo: 0.4, lecturer: 0.3, venue: 0.3 },
    0b1111: { courseName: 0.4, courseCodeSectionNo: 0.15, lecturer: 0.25, venue: 0.2 },
}




export function getClassSlotRatio({
    courseName,
    courseCode,
    sectionNo,
    lecturer,
    venue,
}: IClassSlotRatioParams) {

    const bitmask = (
        (courseName !== '' ? COURSENAME_MASK : 0) +
        (courseCode !== '' && sectionNo !== 0 ? COURSECODE_SECTIONNO_MASK : 0) +
        (lecturer !== '' ? LECTURERNAME_MASK : 0) +
        (venue !== '' ? VENUE_MASK : 0)
    );

    return bitMaskToClassSlotRatio[bitmask];
}
