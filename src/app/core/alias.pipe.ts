import { Pipe, PipeTransform } from '@angular/core';


const aliasMap = {
    '10M': '10 Minute',
    '1H': '1 Hour',
    '6H': '6 Hour',
    '12H': '12 Hour',
}

@Pipe({ name: 'alias' })
export class AliasPipe implements PipeTransform {
    transform(value: number, exponent: string): number {
        return aliasMap[value];
    }
}