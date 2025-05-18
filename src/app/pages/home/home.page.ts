import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, IonRouterOutlet, Animation } from '@ionic/angular';
import { AlarmasService } from 'src/app/services/alarmas.service';
import { Marker, Barrios, Detalles, Alarma, objStorage, Parquimetro } from '../../interfaces/alarmas.interface';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public routerOutlet = inject(IonRouterOutlet);
  private animationCtrl = inject(AnimationController);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private alarmasService = inject(AlarmasService);
  private storageService = inject(StorageService);
  public toastController = inject(ToastController);
  public alertController = inject(AlertController);

  @ViewChild('myRefresh') myRefresh!: ElementRef;
  @ViewChild("divtoggle") myToggle!: ElementRef;
  tokenId!: string;
  alarmas: any;
  markers: Marker[] = [];
  totalAvisos: any[] = [];
  avisos: any[] = [];
  dataLocal: any[] = [];
  dbFirebase!: Parquimetro[];
  listado: boolean = true;
  spinner = true;
  myAnimation!: Animation;
  openModal!: boolean;
  madalAjustes: boolean = false;
  eventRefresher: any;


  barriosHTML: Barrios[] = [
    {barrio: '151 Ventas', activo: true, alarmas: []},
    {barrio: '152 Pueblo Nuevo', activo: true, alarmas: []},
    {barrio: '153 Quintana', activo: true, alarmas: []},
    {barrio: '154 Concepción', activo: true, alarmas: []},
    {barrio: '155 San Pascual', activo: true, alarmas: []},
    {barrio: '156 San Juan Bautista', activo: true, alarmas: []},
    {barrio: '157 Colina', activo: true, alarmas: []},
    {barrio: '158 Atalaya', activo: true, alarmas: []},
    {barrio: '44 Guindalera', activo: true, alarmas: []},
    {barrio: '45 Lista', activo: true, alarmas: []},
    {barrio: '46 Castellana', activo: true, alarmas: []},
    {barrio: '51 El Viso', activo: true, alarmas: []},
    {barrio: '52 Prosperidad', activo: true, alarmas: []},
    {barrio: '53 Ciudad Jardín', activo: true, alarmas: []},
    {barrio: '54 Hispanoamérica', activo: true, alarmas: []},
    {barrio: '55 Nueva España', activo: true, alarmas: []},
    {barrio: '56 Castilla', activo: true, alarmas: []},
    {barrio: '61 Bellas Vistas', activo: true, alarmas: []},
    {barrio: '62 Cuatro Caminos', activo: true, alarmas: []},
    {barrio: '63 Castillejos', activo: true, alarmas: []},
    {barrio: '64 Almenara', activo: true, alarmas: []},
    {barrio: '65 Valdeacederas', activo: true, alarmas: []},
    {barrio: '66 Berruguete', activo: true, alarmas: []},
    {barrio: '75 Rios Rosas', activo: true, alarmas: []},
    {barrio: '76 Vallehermoso', activo: true, alarmas: []},
    {barrio: '84 Pilar', activo: true, alarmas: []},
    {barrio: '85 La Paz', activo: true, alarmas: []},
    {barrio: '93 Ciudad Universitaria', activo: true, alarmas: []},
    {barrio: '94 Valdezarza', activo: true, alarmas: []},
  ];

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe((params) => {
      this.tokenId = params['id'];
      this.alarmasService.id = params['id'];

      this.actualizarAlarmas();
    });
    // Actualizar barrios seleccionados
    this.storageService.actualizarStorage.subscribe( (data: objStorage[]) => {

      this.barriosHTML.forEach( (el, i) => {
        el.activo = data[i].activo;
      } );
      this.marcadores( this.barriosHTML );
    } )

  }

  ionViewDidEnter() {
    this.dataLocal = this.alarmasService.dataLocal;
    if ( this.dataLocal.length == 0 ) {

      this.alarmasService.getDataLocal().subscribe( (data:any) => {

          this.dataLocal = data;

      } );
    }
  }

  mostrarMapa() {
    if ( this.eventRefresher ) {
      this.eventRefresher.target.complete();
    }
    // this.router.navigate(['/mapa']);
    setTimeout( () => this.listado = false, 100 )
  }

  handleRefresh(event:any) {

    this.eventRefresher = event;

    this.actualizarAlarmas( event );
  };

  // Modal ajustes
  modalSelectBarrios() {
    this.madalAjustes = true;
    this.openModal = true;
    this.storageService.actualizarAjustes.emit( true );
  }
  closemodal( event: boolean ) {
    if ( !event ) {
      this.openModal = false;
    }
  }


  //===============================================
  // Ordenar avisos para mostrar en pantalla
  //===============================================
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
        // this.ordenarPorFecha(alarmaDetalles);
        this.ordenarPorPrioridad(alarmaDetalles);
        const alarm = {
          alarma: el,
          detalles: alarmaDetalles
        };
        item.alarmas[idx] = alarm;
      } );
    });
    this.marcadores( this.barriosHTML );
    // this.loading.dismiss();
    this.spinner = false;

  }

  //==========================================================
  // Establecer prioridad de la Alarma
  //==========================================================
  //==========================================================
  // Plataforma: Fuera de servicio => Prioridad 1
  // Plataforma: Sin conexión => Prioridad 2
  // Plataforma: Modulo de monedad => Prioridad 3
  // Controlador: Fuera de servicio => Prioridad 4
  // Controlador: Sin conexión => Prioridad 5
  // Controlador: Modulo de monedas => Prioridad 6
  // Controlador: Teclado => Prioridad 7
  // Controlador: Display vandalizado => Prioridad 8
  // Controlador: No imprime => Prioridad 9
  // Controlador: Cubeta vandalizada => Prioridad 10
  // Controlador: Falta pegatina barrio => Prioridad 11

  //==========================================================
  establecerPrioridad(detalles: Detalles): number {

    // if ( new Date().getDate() != Number(detalles.FechaInicio.slice(0,2)) ) {
    //   return 20;
    // }
    if ( detalles.Fuente == 'Plataforma' ) {
        if ( detalles.Estado.includes('servicio') || detalles.Estado.includes('Servicio') ) {
          return 1;
        }
        if ( detalles.Descripcion.includes('SIN CONEXION') || detalles.Descripcion.includes('No comunica') ) {
          return 2;
        }
        if ( detalles.Descripcion.includes('monedas') ) {
          return 3;
        }
    }
    if ( detalles.Fuente.includes('Controlador') ) {

        if ( detalles.Descripcion.includes('servicio') ) {
          return 4;
        }
        if ( detalles.Descripcion.includes('SIN CONEXION') ) {
          return 5;
        }
        if ( detalles.Descripcion.includes('traga') || detalles.Descripcion.includes('TRAGA') ) {
          return 6;
        }
        if ( detalles.Descripcion.includes('Teclado') || detalles.Descripcion.includes('TECLADO') ) {
          return 7;
        }
        if ( detalles.Descripcion.includes('Display') ) {
          return 8;
        }
        if ( detalles.Descripcion.includes('imprime') || detalles.Descripcion.includes('NO IMPRIME') ) {
          return 9;
        }
        if ( detalles.Descripcion.includes('CUBETA') ) {
          return 10;
        }
        if ( detalles.Descripcion.includes('BARRIO') ) {
          return 11;
        }
    }
    return 12;
  }
  //==========================================================
  // ORDENAR LAS AVERIAS DEPENDIENDO DE SU PRIORIDAD
  ordenarPorPrioridad(arr: Detalles[]) {
  //==========================================================
    arr.sort((a, b) => {
      return a.prioridad! - b.prioridad!;
    });
    return arr;
  }

  //===============================================
  // Ordernar avios por fecha y hora
  //===============================================
  ordenarPorFecha(arr: Detalles[]) {
    const fechaHoy = new Date();
    arr.forEach( el => {
      let numMes = el.FechaInicio.slice(3,5) - 1;
      const mes = ( numMes < 10 ) ? `0${numMes}` : numMes;
      const dia = el.FechaInicio.slice(0,2);
      const anio = el.FechaInicio.slice(6,10);
      const horario = el.FechaInicio.slice(11, el.FechaInicio.length );
      let arrHora = horario.split(':');
      const hora = (arrHora[0].length == 1) ? '0' + arrHora[0] : arrHora[0];
      const minutos = arrHora[1];
      const segundos = arrHora[2];
      el.FechaInicio = new Date(anio, Number(mes), dia, hora, minutos, segundos);
    } )
    arr.forEach( el => {
      if ( el.FechaInicio.getDate() == fechaHoy.getDate() && el.FechaInicio.getMonth() == fechaHoy.getMonth() ) {
        arr.sort((a, b) => {
          return b.FechaInicio.getTime() - a.FechaInicio.getTime();
        });
      }
    } )
    return arr;
  }

  //?===============================================
  //? Convertir en objeto new Date
  //?===============================================
  convertirFecha(inicio: string) {
      let numMes = Number(inicio.slice(3,5)) - 1;
      const mes = ( numMes < 10 ) ? `0${numMes}` : numMes;
      const dia = inicio.slice(0,2);
      const anio = inicio.slice(6,10);
      const horario = inicio.slice(11, inicio.length );
      let arrHora = horario.split(':');
      const hora = (arrHora[0].length == 1) ? '0' + arrHora[0] : arrHora[0];
      const minutos = arrHora[1];
      const segundos = arrHora[2];
      const fechaInicio  = new Date(Number(anio), Number(mes), Number(dia), Number(hora), Number(minutos), Number(segundos));
      return fechaInicio;

  }

  //===============================================
  // Enviar marcadores para mostrarlos en el mapa
  //===============================================
  marcadores( alarmas: Barrios[] ) {
    this.markers = [];
    alarmas.forEach( barrio => {
      if ( barrio.activo ) {
        this.markers.push( ...barrio.alarmas );
      }
    } );

    //===============================================
    // DETECTAR SI EL AVISO VIENE SIN COORDENADAS
    //===============================================
    // tslint:disable-next-line: no-shadowed-variable
    let idx = 0;
    this.markers.forEach( marker => {
      const markerLocal = this.dataLocal.find( mk => mk.alias === marker.alarma.Parquimetro );
      if ( !markerLocal ) {
        console.log(marker);
      }
      // Cambiar latitud y longitud por los de la base de datos local
      if ( markerLocal ) {
        marker.alarma.Longitud = Number(markerLocal.longitud);
        marker.alarma.Latitud = Number(markerLocal.latitud);
        marker.alarma.Tarifa = markerLocal.tarifa;
      }
    } );


  }

  //==========================================================
  // Enviar alarma defectuosa a la base de datos Firebase
  //==========================================================
  // async enviarAlarmaErronea( marker: InfoAlarma ) {
  //   const response = await this.dataFirebaseService.addItemError( marker );
  // }

  actualizarAlarmas( refres?:any ) {
    this.rotarRefresh();
    this.spinner = true;
    // this.markers = [];

    this.alarmasService.getAlarmas().subscribe( (resp:any) => {
      if ( !resp ) {
        this.errorActualizarAlarmas();
      } else {
        // traslada el scroll al inicio del viewport
        document.getElementsByTagName('body')[0].scrollIntoView();

        this.alarmas = resp;
        this.ordenarAvisos( this.alarmas );
      }
      this.spinner = false;
      this.stopRotate();
      if ( refres ) {
        this.eventRefresher.target.complete();
      }
    } );
  }

  async errorActualizarAlarmas() {
    const alert = await this.alertController.create({
      header: 'Error de actualización!',
      message: 'Para actualizar volver a Login!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Logín',
          id: 'confirm-button',
          handler: () => {
            console.log('Voler al login..');
            this.router.navigate(['login']);
          }
        }
      ]
    });

    await alert.present();
  }

  rotarRefresh() {
    const elemento = this.myRefresh.nativeElement;
    this.myAnimation! = this.animationCtrl.create()
      .addElement(elemento)
      .duration(800)
      .iterations(Infinity)
      .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)')

    this.myAnimation.play();
  }

  stopRotate() {
    this.myAnimation.stop();
  }

  isMobileIphone(){
    return (
      (navigator.userAgent.match(/iPhone/i)) ||
      (navigator.userAgent.match(/iPod/i)) ||
      (navigator.userAgent.match(/iPad/i))
    );
  }

  async presentToast(alias: string) {
    const toast = await this.toastController.create({
      message: `Alarma defectuosa número ${alias} !`,
      position: "top",
      duration: 3000,
      color: 'ligth'
    });
    toast.present();
  }

}
