import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertFecha'
})
export class ConvertFechaPipe implements PipeTransform {

  transform(value: string ): unknown {


    return null;
  }

}
