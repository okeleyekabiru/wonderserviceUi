import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateAgo',
    pure: true
})
export class DateAgoPipe implements PipeTransform {

    transform(value: Date, args?: any): any {
        if (value) {
           return new Date(value).toDateString()
        }
        return value;
    }

}