import { Component, Input, OnInit, inject } from '@angular/core';
import { Barrios } from 'src/app/interfaces/alarmas.interface';
import { IonRouterOutlet } from '@ionic/angular';
import { Marker } from '../../interfaces/alarmas.interface';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-item-alarmas',
  templateUrl: './item-alarmas.component.html',
  styleUrls: ['./item-alarmas.component.scss'],
})
export class ItemAlarmasComponent implements OnInit {

  public routerOutlet = inject( IonRouterOutlet );

  @Input() Barrios!: Barrios[];
  openModal: boolean = false;
  selectAlarma!: Marker;

  constructor() {
  }
  ngOnInit(): void {
    // console.log(this.Barrios);

  }


  mostrarDetalles( alarma: Marker ) {
    this.selectAlarma = alarma;
    this.openModal = true;

  }

  closemodal() {
    this.openModal = false;
  }


  async comoLlegar( marker: Marker, mapa: string ) {

    console.log(marker);
    if ( mapa === 'google' ) {
      await Browser.open( {url: `https://maps.google.com/?q=${marker.alarma.Latitud},${marker.alarma.Longitud}`});
    } else if ( mapa === 'apple' ) {
      await Browser.open({url: `maps://maps.google.com/maps?daddr=${marker.alarma.Latitud},${marker.alarma.Longitud}&amp;ll=`});
    } else {
      await Browser.open({url: `https://www.waze.com/ul?ll=${marker.alarma.Latitud}%2C${marker.alarma.Longitud}&navigate=yes&zoom=17`});
    }
    await Browser.close();
  }


  isMobileIphone(){
    return (
      (navigator.userAgent.match(/iPhone/i)) ||
      (navigator.userAgent.match(/iPod/i)) ||
      (navigator.userAgent.match(/iPad/i))
    );
}


}
