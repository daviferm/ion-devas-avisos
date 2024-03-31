import { Pipe, PipeTransform } from '@angular/core';
import { Detalles, InfoAlarma, Parquimetro } from '../interfaces/alarmas.interface';


@Pipe({
  name: 'iconUrl'
})
export class IconUrlPipe implements PipeTransform {

  url = '';
  urlControlador = 'assets/img/controlador';
  urlPlataforma = 'assets/img/plataforma';
  urlAltaRotacion = 'assets/img/altaRotacion';
  transform(value: any): string {

    //==========================================================
    // Establecer preferencia de Alarmas en función de la Fuente
    //==========================================================
    const averia = value.detalles[0].Descripcion;
    const aviso = value.detalles[0];
    let objAlarma = value.detalles[0];
    // if ( value.alarma.Fuente === ',' ) {
    //   objAlarma = value.detalles[0];
    // }
    //==========================================================
    // Enviar imagen marcador para parquímetro de alta rotación
    //==========================================================
    if ( value.alarma.Tarifa === 'AR' ) {

      // const averia = aviso.Descripcion;

      if ( aviso.Fuente == 'Plataforma' ) {

          if (   aviso.Descripcion.includes('CONEXION') || aviso.Descripcion.includes('No comunica') ) {

            this.urlAltaRotacion = `${this.urlAltaRotacion}/plataforma`;

          } else  if ( aviso.Estado == 'Fuera de Servicio' ) {

            this.urlAltaRotacion = `${this.urlAltaRotacion}/plataforma/fueraDeServicio`;

          } else {

            this.urlAltaRotacion = `${this.urlAltaRotacion}/plataforma`;

          }
        }

        if ( aviso.Fuente == 'Controlador' ) {

          this.urlAltaRotacion = `${this.urlAltaRotacion}/controlador`;

        }

          this.url = this.incluirIcono( averia, this.urlAltaRotacion );
          // this.url = this.incluirIconoAltarotacion( aviso );
          return this.url;
    }
    // Avisos de la Plataforma
    if ( objAlarma.Fuente === 'Plataforma' ) {
      //==========================================================
      // Avisos de Petición de mantenimiento (Plataforma)
      //==========================================================
      // if ( objAlarma.Estado == 'No Comunica' ) {
        //   this.url = 'assets/img/plataforma/offline.png';
        //       return this.url;
        // }
        if ( objAlarma.Estado.includes('Fuera de servicio') || objAlarma.Estado.includes('Fuera de Servicio') ) {
          //==========================================================
          // Avisos Fuera de Servicio => Plataforma
          //==========================================================
          if ( averia.includes('Violaci�n puerta') || averia.includes('Violacion de puerta') || averia.includes('Violaci�n alcanc�a') ) {
            this.url = 'assets/img/plataforma/violacionpuerta.png';
            return this.url;
          }
          if ( averia.includes('Impresora') ) {
            this.url = 'assets/img/plataforma/impresora2.png';
            return this.url;
          }
          if ( averia.includes('monedas') ) {
            this.url = 'assets/img/plataforma/monedas2.png';
            return this.url;
          }
          if ( averia.includes('Teclado') ) {
            this.url = 'assets/img/plataforma/teclado2.png';
            return this.url;
          }
          if ( averia.includes('Bater�a') || averia.includes('Bateria') ) {
            this.url = 'assets/img/plataforma/bateria2.png';
            return this.url;
          }
          if ( averia.includes('Antidrilling') ) {
            this.url = 'assets/img/plataforma/fueradeservicioantidriling.png';
            return this.url;
          }
          this.url = 'assets/img/plataforma/fueradeservicio.png';
          return this.url;

      } else if ( objAlarma.Estado === 'No comunica' ) {
          //==========================================================
          // AVISOS SIN CONEXIÓN (PRATAFORMA)
          //==========================================================
          this.url = 'assets/img/plataforma/offline2.png';
          return this.url;
      } else {
          //==========================================================
            // Avisos Petición de mantenimiento => Plataforma
            //==========================================================
            if ( averia.includes('tarjetas') || averia.includes('EMV') ) {
              this.url = 'assets/img/plataforma/tarjeta.png';
              return this.url;
            }
            if ( averia.includes('Bater�a') || averia.includes('Bateria baja') ) {
              this.url = 'assets/img/plataforma/bateria.png';
              return this.url;
            }
            if ( averia.includes('TECLADO') ) {
              this.url = 'assets/img/plataforma/teclado.png';
              return this.url;
            }
            if ( averia.includes('Antidrilling') ) {
              this.url = 'assets/img/plataforma/antidriling.png';
              return this.url;
            }
            if ( averia.includes('tiquets') || averia.includes('Impresora')) {
              this.url = 'assets/img/plataforma/impresora.png';
              return this.url;
            }
            if ( averia.includes('monedas') ) {
              this.url = 'assets/img/plataforma/monedas.png';
              return this.url;
            }
            if ( averia.includes('No comunica') ) {
              this.url = 'assets/img/plataforma/offline.png';
              return this.url;
            }
            if ( averia.includes('Violaci�n alcanc�a') || averia.includes('Violaci�n puerta') ) {
              console.log(averia);
              this.url = 'assets/img/plataforma/abierto.png';
              return this.url;
            }
            if ( averia.includes('datapack') ) {
              this.url = 'assets/img/plataforma/data-pack2.png';
              return this.url;
            }
            if ( averia.includes('�tems') ) {
              this.url = 'assets/img/plataforma/envio-items.png';
              return this.url;
            }
            if ( objAlarma.Estado == 'No Comunica' ) {
              this.url = 'assets/img/plataforma/offline.png';
              return this.url;
            }

            return this.url = 'assets/img/plataforma/basico.png';

      }
    } else {
        //==========================================================
        // AVISOS CONTROLADOR
        //==========================================================
        this.url = this.incluirIcono( averia, this.urlControlador );
        return this.url;
    }
  }


  incluirIcono( averia:any, urlCarpeta:string ) {

      if ( averia.includes('Bater�a baja') || averia.includes('Bateria baja') ) {
        this.url = `${urlCarpeta}/bateria.png`;
        return this.url;
      }
     if ( averia.includes('CUBETA') ) {
        this.url = `${urlCarpeta}/cubetamonedas.png`;
        return this.url;
      }
      if ( averia.includes('MONEDA') ) {
        this.url = `${urlCarpeta}/monedas.png`;
        return this.url;
      }
      if ( averia.includes('monedas') ) {
        this.url = `${urlCarpeta}/monedas.png`;
        return this.url;
      }
      if ( averia.includes('BANCARIO') ) {
        this.url = `${urlCarpeta}/tarjeta.png`;
        return this.url;
      }
      if ( averia.includes('BANCARIA') ) {
        this.url = `${urlCarpeta}/tarjeta.png`;
        return this.url;
      }
      if ( averia.includes('EMV') ) {
        this.url = `${urlCarpeta}/tarjeta.png`;
        return this.url;
      }
      if ( averia.includes('LIMPIEZA') ) {
        this.url = `${urlCarpeta}/limpieza.png`;
        return this.url;
      }
      if ( averia.includes('NO IMPRIME') ) {
        this.url = `${urlCarpeta}/impresora.png`;
        return this.url;
      }
      if ( averia.includes('tiquets') || averia.includes('Impresora') ) {
        this.url = `${urlCarpeta}/impresora.png`;
        return this.url;
      }
      if ( averia.includes('CONEXION') || averia.includes('No comunica') ) {
        this.url = `${urlCarpeta}/offline.png`;
        return this.url;
      }
      if ( averia.includes('TECLADO') ) {
        this.url = `${urlCarpeta}/teclado.png`;
        return this.url;
      }
      if ( averia.includes('DISPLAY') ) {
        this.url = `${urlCarpeta}/display.png`;
        return this.url;
      }
      if ( averia.includes('TICKETS') ) {
        this.url = `${urlCarpeta}/impresora.png`;
        return this.url;
      }
      if ( averia.includes('BARRIO') ) {
        this.url = `${urlCarpeta}/pegatinaBarrio.png`;
        return this.url;
      }
      if ( averia.includes('TARIFAS') ) {
        this.url = `${urlCarpeta}/pegatinaTarifa.png`;
        return this.url;
      }
      if ( averia.includes('SERVICIO') ) {
        this.url = `${urlCarpeta}/fueradeservicio.png`;
        return this.url;
      }
      if ( averia.includes('Antidrilling') ) {
        this.url = `${urlCarpeta}/antidrilling.png`;
        return this.url;
      }
      if ( averia.includes('Violaci�n alcanc�a') ) {
        this.url = `${urlCarpeta}/abierto.png`;
        return this.url;
      }
      if ( averia.includes('Bater�a') || averia.includes('Bateria') ) {
        this.url = `${urlCarpeta}/bateria.png`;
        return this.url;
      }

    return `${urlCarpeta}/basico.png`;

  }
  incluirIconoAltarotacion( aviso: Detalles ) {

    const averia = aviso.Descripcion;

    let urlCarpeta;
    if ( aviso.Fuente == 'Plataforma' ) {

      if ( aviso.Estado == 'Fuera de servicio' ) {

        urlCarpeta = `${this.urlAltaRotacion}/plataforma/fueraDeServicio`;
        this.incluirIcono( averia, urlCarpeta );
        return;

      } else  if ( aviso.Descripcion.includes('CONEXION') || aviso.Descripcion.includes('No comunica') ) {
        urlCarpeta = `${this.urlAltaRotacion}/plataforma`;

      } else {

        urlCarpeta = `${this.urlAltaRotacion}/plataforma`
        this.incluirIcono( averia, urlCarpeta );
        return;

      }
    }

    if ( aviso.Fuente == 'Controlador' ) {

      urlCarpeta = `${this.urlAltaRotacion}/controlador`;
      this.incluirIcono( averia, urlCarpeta );
      return;

    }

    this.incluirIcono( averia, this.urlAltaRotacion );

    return `${urlCarpeta}/basico.png`;

  }
  //==========================================================
  // ALARMAS: PRIORIDAD

  // Plataforma: Fuera de servicio => Prioridad 1
  // Plataforma: Sin conexión => Prioridad 2
  // Controlador: Fuera de servicio => Prioridad 3
  // Controlador: Modulo de monedad => Prioridad 4
  // Controlador: Teclado => Prioridad 5
  // Controlador: Display vandalizado => Prioridad 6
  // Controlador: No imprime => Prioridad 7
  // Controlador: Cubeta vandalizada => Prioridad 8
  // Controlador: Falta pegatina barrio => Prioridad 9

  //==========================================================


}
