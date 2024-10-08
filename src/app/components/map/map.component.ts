import { Component, Input, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { Marker } from 'src/app/interfaces/alarmas.interface';
import { LayerBarrio } from 'src/app/interfaces/alarmas.interface';
import { StorageService } from '../../services/storage.service';
import { objStorage } from '../../interfaces/alarmas.interface';
import { Subject, Subscription } from 'rxjs';
import { GeolocationService } from '../../services/geolocation.service';
import { GoogleMap } from '@angular/google-maps';
import { Position } from '@capacitor/geolocation';
import { PolygnosService } from 'src/app/services/polygnos.service';
import { SemaforoFotoRojoService } from 'src/app/services/semaforo-foto-rojo.service';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  private storageService = inject( StorageService );
  private geolocationService = inject( GeolocationService );
  public polygonosService = inject( PolygnosService );
  private semaforoService = inject( SemaforoFotoRojoService );

  @Input() markers: Marker[] = [];
  openListIcon: boolean = false;
  openAlertInfo: boolean = false;


  // imgPosition = 'assets/icon/marker-car.png';
  iconSemaforo = 'assets/img/semaforo-01.png';
  gps = false;
  barriosFull?: LayerBarrio[];
  barriosSelec!: LayerBarrio[];
  $subscription!: Subscription;
  $obsLocation!: Subject<unknown>;
  infoMarker!: Marker;


  center: google.maps.LatLngLiteral = { lat: 40.459031, lng: -3.689918 };

  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom : 12.5,
    disableDefaultUI: true,
    scaleControl: true,
    fullscreenControl: false,
    gestureHandling: 'greedy',
    mapTypeControl: false,
    rotateControl: true,
    streetViewControl: false,
    panControl: true
  }
  polygonOptions: google.maps.PolygonOptions = {
    fillColor: '#5cc9f5',
    fillOpacity: .4,
    strokeColor: 'black',
    strokeWeight: 0.5,
    geodesic: true
  }
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    zIndex: 10000,
    // optimized: true,
  };

  markerGpsOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/icon/car-pin-location.png'
  };
  markerPosition!: google.maps.LatLngLiteral;

  semaforos: any;


  constructor() {

    this.semaforos = this.semaforoService.semaforoFotoRojo;
    this.barriosFull = this.polygonosService.barriosLayers;
    this.getBarriosStorage();
  }

  ngAfterViewInit() {
    this.$subscription = this.geolocationService.obtenerPosicion().subscribe( position => {
      if ( position ) {
        this.gps = true;
        this.markerPosition = {lat: position.coords.latitude, lng: position.coords.longitude };
      }
    } )

    // Actualizar barrios seleccionados
    this.storageService.actualizarStorage.subscribe( (data: objStorage[]) => {
      this.barriosSelec = [];
      this.aplicarFirtro( data );
      // this.getBarriosStorage();
    } )
  }

  ngOnInit() {



  }

  ngOnDestroy() {
    this.gps = false;
  }
  changeZoomMap( mapa: GoogleMap ) {
    // console.log(mapa.getZoom());
  }

  seguir( mapa: GoogleMap ) {
    this.geolocationService.printCurrentPosition().then( (position: Position) => {
      this.markerPosition = {lat: position.coords.latitude, lng: position.coords.longitude };
      mapa.panTo( this.markerPosition );

    } )
  }

  getBarriosStorage() {
    this.barriosSelec = this.polygonosService.barriosLayers;
    const data = JSON.parse( this.storageService.getLocalStorage('area-barrios')! );
    if ( !data ) {
      this.barriosSelec = this.barriosFull!;
    } else {

      this.aplicarFirtro( data );
    }
  }

  aplicarFirtro( data: objStorage[] ) {

    this.barriosSelec = [];
    const dataStorage = data.filter( (elem:objStorage) => elem.activo );
    dataStorage.forEach( (area:objStorage) => {
      const elem = this.barriosFull!.find( element => element.id.startsWith( area.numero ) );
      this.barriosSelec.push( elem! );
    } )
  }

  abrirModal( marker: Marker ) {
    this.infoMarker = marker;
    this.openAlertInfo = true;
  }
  mostrarModal() {this.openAlertInfo = true};

  cerrarModalInfo( event: any ) {this.openAlertInfo = false};

  mostrarInfoIcons() {this.openListIcon = !this.openAlertInfo};

  cerrarModalListIcon( isOpen: boolean ) {
    if ( isOpen ) {
      console.log('Cerrar Info Iconos!!');
    }
    this.openListIcon = isOpen;
  }


}
