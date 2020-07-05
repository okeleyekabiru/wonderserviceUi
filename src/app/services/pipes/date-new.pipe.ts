import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateNew',
    pure: true
})
export class DateNewPipe implements PipeTransform {

    transform(value: Date, args?: any): any {
        if (value) {
           return new Date(value).toDateString()
        }
        return value;
    }

}