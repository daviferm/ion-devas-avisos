import { EventEmitter, Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Alarma, Parquimetro } from '../interfaces/alarmas.interface';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AlarmasService {
  public actualizarAvisos = new EventEmitter<any>();
  // Railway

  // url_localhost = 'http://localhost:3000/login';

  //* URL vps Clouding.io
  public URL_BACKDVS = 'https://backend-devas-production.up.railway.app/login';
  // public URL_BACKDVS = 'http://161.22.42.76:443/login';
  // public URL_BACKDVS = 'http://dvs-backend.es/login';
  //* URL Firebase producción
  public URL_FIREBASE = 'https://us-central1-avisos-devas-pwa.cloudfunctions.net/api/login';

  public URL_ALARMAS = this.URL_BACKDVS;


  // URL_SERVICES = '/login'
  alarmas: any[] = [];
  public dataLocal: Parquimetro[] = [];
  public avisos: Alarma[] = [];
  public id!: string;
  private urlDataFS: string = 'https://app-devas.firebaseio.com/parkimetros.json';


  constructor( private router: Router ) {
    this.getFirebase().subscribe( (resp: Parquimetro[]) => {

      if ( resp.length > 10 ) {
        console.log('Base de datos Firebase');
        this.dataLocal = resp;
      } else {
        console.error('Base de datos local');
        this.getDataLocal().subscribe();
      }
    } )
  }

  //*?===============================================
  //*? Obtener las alarmas de la página de UTEDEVAS
  //*?===============================================
  getAlarmas() {
    return ajax
      .getJSON(`${this.URL_ALARMAS}/${this.id}`)
      .pipe(
        // tap( resp => console.log(this.URL_ALARMAS) ),
        map((resp: any) => {
          this.avisos = resp.alarmas;
          this.actualizarAvisos.emit( this.avisos );
          return resp.alarmas;
        }),
        catchError(error => {
          console.log('CATCHERROR: ', error);
          // this.router.navigate(['login']);
          return of(error);
        })
      )
  }
   //*?====================================================================
   //*  Obtener arreglo con todos los parquímetros y los guarda en Firebase
   //*?====================================================================
   getFirebase() {

    return ajax
      .getJSON(this.urlDataFS)
      .pipe(
        map((res: any) => res),
        catchError(error => of(error))
      )
  }


  getDataLocal() {
    return ajax
      .getJSON('../assets/data/data.json')
      .pipe(map((resp: any) => {
        this.dataLocal = [];
        for ( const clave in resp.parkimetros ) {
          this.dataLocal.push(resp.parkimetros[clave]);
        }
        console.log('BASE DE DATOS LOCAL');
        return this.dataLocal;
      }));
  }

}
