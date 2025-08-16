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
  itemLlave: string[] = ['4410166', '5410363', '5511020', '5210614', '5310599',
                         '5510413', '5510359', '5410810', '5310532', '4410166',
                         '5311154', '5510413', '5110301', '5310594', '5510979',
                         '5410776', '5210640', '5410815', '5410866', '4410031',
                         '5410861', '4410168', '5510972', '5410819', '4410099',
                         '5310600', '5510969', '5110477', '4410031'
  ];
  llave: string[] = ['342', '328', '320', '345', '334', '348', '348', '326',
                     '345', '342', '303', '348', '320', '328', '307', '320',
                     '328', '348', '330', '332', '330', '342', '326', '342', '320', '328', '307', '303', '332'
  ];





  constructor(  ) {}


  ngOnInit() {
    const numeroItem = this.item.alarma.Parquimetro.slice( 3, this.item.alarma.Parquimetro.length);

    const index = this.itemLlave.indexOf(numeroItem);
    if ( index !== -1 ) {
      this.item.alarma.llave = this.llave[index];
    } else {
      console.log('Llave correcta');
    }
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
