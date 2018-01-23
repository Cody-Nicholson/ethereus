import {timeSecond, timeHour, timeDay, timeMinute, timeMonth, timeYear, timeWeek} from 'd3-time';
import {timeFormat} from 'd3-time-format';


const defaultFormats = {
    millisecond: '%H:%M:%S.%L',
    second: '%H:%M:%S',
    minute: '%H:%M',
    hour: '%H:%M',
    day: '%e. %b',
    week: '%e. %b',
    month: '%b \'%y',
    year: '%Y'
};

export type dateFormatter = (date: Date) => string;

export class AxisDate {

    millisecond: dateFormatter;
    second: dateFormatter;
    minute: dateFormatter;
    hour: dateFormatter;
    day: dateFormatter;
    week: dateFormatter;
    month: dateFormatter;
    year: dateFormatter;

    constructor(axisFormats: {[key: string]: string} = defaultFormats) {
        Object.keys(axisFormats)
            .forEach(unit => {
                this[unit] = timeFormat(axisFormats[unit]);
            });
    }

    format = (date) => {
        let format = (timeSecond(date) < date ? this.millisecond
            : timeMinute(date) < date ? this.second
            : timeHour(date) < date ? this.minute
            : timeDay(date) < date ? this.hour
            : timeMonth(date) < date ? (timeWeek(date) < date ? this.day : this.week)
            : timeYear(date) < date ? this.month
            : this.year);
        return format(date);
    }
}