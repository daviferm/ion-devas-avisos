import { Pipe, PipeTransform } from '@angular/core';
import { InfoAlarma } from '../interfaces/alarmas.interface';

@Pipe({
  name: 'imgItem'
})
export class ImgItemPipe implements PipeTransform {

  transform(alarma: InfoAlarma): string {

    if ( alarma.alarma.Estado == 'No Comunica' ) {
      return 'assets/img/alarmas/Offline.png';
    }
    // if ( alarma.detalles.length > 0 ) {}
    if ( alarma.detalles[0].Descripcion.includes('Bateria') || alarma.detalles[0].Descripcion.includes('Bater�a') ) {
      return 'assets/img/alarmas/low-battery.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('monedas') ) {
      return 'assets/img/alarmas/monedas.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('MONEDA') ) {
      return 'assets/img/alarmas/monedas.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('DISPLAY') ) {
      return 'assets/img/alarmas/display.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('Violaci�n puerta') ) {
      return 'assets/img/alarmas/abierto.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('Violaci�n alcanc�a') ) {
      return 'assets/img/alarmas/abierto.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('TECLADO') || alarma.detalles[0].Descripcion.includes('Teclado') ) {
      return 'assets/img/alarmas/teclado.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('LIMPIEZA') ) {
      return 'assets/img/alarmas/limpieza.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('BARRIO') ) {
      return 'assets/img/alarmas/pegatinaBarrio.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('TARIFAS') ) {
      return 'assets/img/alarmas/pegatinaTarifa.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('Antidrilling') ) {
      return 'assets/img/alarmas/antidrilling.png';
    }
    if ( alarma.detalles[0].Descripcion.startsWith('No comunica') || alarma.detalles[0].Descripcion.includes('SIN CONEXION') ) {
      return 'assets/img/alarmas/Offline.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('tiquets') || alarma.detalles[0].Descripcion.includes('Impresora') || alarma.detalles[0].Descripcion.includes('TIKETS') ) {
      return 'assets/img/alarmas/impresora.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('Lector tarjetas') || alarma.detalles[0].Descripcion.includes('BANCARIO') || alarma.detalles[0].Descripcion.includes('BANCARIA') || alarma.detalles[0].Descripcion.includes('EMV') ) {
      return 'assets/img/alarmas/tarjeta.png';
    }
    if ( alarma.detalles[0].Descripcion.includes('�tems') ) {
      return 'assets/img/alarmas/icon-items.png';
    }
    // if ( alarma.detalles[0].Descripcion.includes('datapack') ) {
    //   return 'assets/img/alarmas/icon-items.png';
    // }


    return 'assets/img/alarmas/no-img.png';
  }

}
