import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'merge',
})
export class MergePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(arr1: any[], arr2: any[]) {
    if (arr1.length > 0)
      return [...arr1, ...arr2];
    return arr2;
  }
}
