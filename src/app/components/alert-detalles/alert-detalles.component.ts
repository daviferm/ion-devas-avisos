import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, inject } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Parquimetro, Marker } from '../../interfaces/alarmas.interface';
import { AnimationController } from '@ionic/angular';
import { AlarmasService } from 'src/app/services/alarmas.service';

@Component({
  selector: 'app-alert-detalles',
  templateUrl: './alert-detalles.component.html',
  styleUrls: ['./alert-detalles.component.scss'],
})
export class AlertDetallesComponent implements OnInit {

  private animationCtrl = inject( AnimationController );
  // private alarmasService = inject( AlarmasService );

  @ViewChild('mdalbg') mdalbg!: ElementRef;
  @ViewChild('cardmodal') cardmodal!: ElementRef;
  @Output() cerrarAlert: EventEmitter<boolean> = new EventEmitter();
  @Output() tareaRealizada: EventEmitter<Parquimetro> = new EventEmitter();
  @Input() titulo!: string;
  @Input() item!: Marker;
  rutaActiva!: string;

  constructor(  ) {}


  ngOnInit() {
    // console.log(this.item);
  }

  async comoLlegar( marker: Marker, mapa: string ) {

    if ( mapa === 'google' ) {
      await Browser.open( {url: `https://maps.google.com/?q=${marker.alarma.Latitud},${marker.alarma.Longitud}`});
    } else if ( mapa === 'apple' ) {
      await Browser.open({url: `maps://maps.google.com/maps?daddr=${marker.alarma.Latitud},${marker.alarma.Longitud}&amp;ll=`});
    } else {
      await Browser.open({url: `https://www.waze.com/ul?ll=${marker.alarma.Latitud}%2C${marker.alarma.Longitud}&navigate=yes&zoom=17`});
    }
  }

  mostrarModal() {

    const modalInfo = this.animationCtrl.create()
      .addElement( this.cardmodal.nativeElement )
      .duration( 600 )
      .keyframes([
        { offset: 0, transform: 'translate3d(0, 3000px, 0)', opacity: '0' },
        { offset: 0.6, transform: 'translate3d(0, -20px, 0)', opacity: '1' },
        { offset: 0.75, transform: 'translate3d(0, 10px, 0)' },
        { offset: 0.9, transform: 'translate3d(0, -5px, 0)' },
        { offset: 1, transform: 'translate3d(0, 0, 0)' },
      ])

    modalInfo.play();

  }

  closeModal( event:any ) {
    if ( event.target.className.includes('modal-background') || event.target.name === 'close-outline' ) {

      const modalInfo = this.animationCtrl.create()
        .addElement( this.cardmodal.nativeElement )
        .duration(500)
        .fromTo('transform', 'translateY(0px)', 'translateY(2000px)')

      const modalBg = this.animationCtrl.create()
        .addElement( this.mdalbg.nativeElement )
        .duration(200)
        .fill('forwards')
        .fromTo('opacity', 1, 0)


      modalInfo.play();
      modalBg.play();

      setTimeout( () => {
        this.cerrarAlert.emit( true );
      }, 100);
    }
  }

  tareaHecha( item: Parquimetro ) {
    this.tareaRealizada.emit( item );
  }


  isMobileIphone(){
    return (
      (navigator.userAgent.match(/iPhone/i)) ||
      (navigator.userAgent.match(/iPod/i)) ||
      (navigator.userAgent.match(/iPad/i))
    );
  }


}
