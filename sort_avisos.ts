

ordenarAvisos(alarmas: any) {

  const anio = new Date().getFullYear();

  this.totalAvisos = [];
  this.avisos = [];
  let alias;
  for ( const alarma of alarmas ) {
    // const alarma of alarmas
    // tslint:disable-next-line: quotemark
    const al = alarma.split("'");
    const alarm = al.filter( (elem:any, idx:number) => idx % 2 !== 0 );

    const numet = alarm[0];
    this.totalAvisos.push( alarm );
    if ( alias !== numet ) {
      const elem: Alarma = {
        Parquimetro: alarm[0],
        Barrio: alarm[1],
        Direccion: alarm[2],
        Longitud: alarm[3],
        Latitud: alarm[4],
        Estado: alarm[5],
        Fuente: alarm[6],
        Tarifa: alarm[7]
      };
      this.avisos.push( elem );
    }
    alias = numet;
  }

  this.barriosHTML.forEach( item => {

    item.alarmas = this.avisos.filter( el => el.Barrio.substring( 0, 3 ) === item.barrio.substring( 0, 3 ) );

    item.alarmas.forEach( (el:Alarma, idx:number) => {

      const alarmaDetalles:any[] = [];
      this.totalAvisos.map( (elem: any) => {
        if ( elem[0] === el.Parquimetro && elem[1].slice(0, 2) !== item.barrio.slice(0, 2) ) {
          const detalle: Detalles = {
            Parquimetro: elem[0],
            Descripcion: elem[1],
            Estado: elem[2],
            Fuente: elem[3],
            FechaInicio: elem[4],
            idAlarmaActual: elem[5],
            // prioridad: 1
          };
          // let detalles = this.convertirFecha( detalle );

          const prioridad = this.establecerPrioridad(detalle);
          detalle.prioridad = prioridad;
          //==========================================================
          // Quitamos los avisos erroneos antiguos
          //==========================================================
          const fechaInicio = detalle.FechaInicio.split("/")[2].substring(0,4);
           if ( Number(fechaInicio) == anio ) {
            alarmaDetalles.push(detalle);
           }

        }
      } );
      //===============================================
      // Ordenar los avios por orden de prioridad
      //===============================================
      // console.log(alarmaDetalles);
      this.ordenarPorFecha(alarmaDetalles);
      this.ordenarPorPrioridad(alarmaDetalles);
      const alarm = {
        alarma: el,
        detalles: alarmaDetalles
      };
      item.alarmas[idx] = alarm;
    } );
  });
  // this.loading.dismiss();

}
