import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Observable, Observer, interval } from 'rxjs';
// import { GeolocationPosition } from '../interfaces/alarmas.interface';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  $intervalo = interval(1000);

  constructor(  ) { }

  printCurrentPosition = async () => await Geolocation.getCurrentPosition();

  obtenerPosicion(): Observable<Position> {

    return new Observable( ( observer: Observer<Position> ) => {

      this.$intervalo.subscribe( () => {

        Geolocation.getCurrentPosition().then( (position: Position) => {

          observer.next( position );

        }, (err:any) => {
          console.log('Error al obtener posición GPS!', err);
        } )

      } )
    } )
  }

  getPosition() {



  }
}
