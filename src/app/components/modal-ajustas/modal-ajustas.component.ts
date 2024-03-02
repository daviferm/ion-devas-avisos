import { Component, ElementRef, OnInit, Output, Renderer2, ViewChild, EventEmitter, Input, inject, signal } from '@angular/core';
import { objStorage } from '../../interfaces/alarmas.interface';
import { StorageService } from '../../services/storage.service';
import { timer } from 'rxjs';


@Component({
  selector: 'app-modal-ajustes',
  templateUrl: './modal-ajustas.component.html',
  styleUrls: ['./modal-ajustas.component.scss'],
})
export class ModalAjustasComponent implements OnInit {

  private renderer = inject( Renderer2 );
  public storageService = inject( StorageService );

  @ViewChild("divtoggle") myToggle!: ElementRef;
  @Output() openModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() modalOpen!: boolean;
  delay = timer(200);

  public barrios: objStorage[] = [
    {barrio: 'Barrio 151', devas: 'dos', numero: '151', activo: true},
    {barrio: 'Barrio 152', devas: 'dos', numero: '152', activo: true},
    {barrio: 'Barrio 153', devas: 'dos', numero: '153', activo: true},
    {barrio: 'Barrio 154', devas: 'dos', numero: '154', activo: true},
    {barrio: 'Barrio 155', devas: 'dos', numero: '155', activo: true},
    {barrio: 'Barrio 156', devas: 'dos', numero: '156', activo: true},
    {barrio: 'Barrio 157', devas: 'dos', numero: '157', activo: true},
    {barrio: 'Barrio 158', devas: 'dos', numero: '158', activo: true},
    {barrio: 'Barrio 44', devas: 'dos', numero: '44', activo: true},
    {barrio: 'Barrio 45', devas: 'dos', numero: '45', activo: true},
    {barrio: 'Barrio 46', devas: 'dos', numero: '46', activo: true},
    {barrio: 'Barrio 51', devas: 'dos', numero: '51', activo: true},
    {barrio: 'Barrio 52', devas: 'dos', numero: '52', activo: true},
    {barrio: 'Barrio 53', devas: 'dos', numero: '53', activo: true},
    {barrio: 'Barrio 54', devas: 'dos', numero: '54', activo: true},
    {barrio: 'Barrio 55', devas: 'dos', numero: '55', activo: true},
    {barrio: 'Barrio 56', devas: 'dos', numero: '56', activo: true},
    {barrio: 'Barrio 61', devas: 'uno', numero: '61', activo: true},
    {barrio: 'Barrio 62', devas: 'uno', numero: '62', activo: true},
    {barrio: 'Barrio 63', devas: 'uno', numero: '63', activo: true},
    {barrio: 'Barrio 64', devas: 'uno', numero: '64', activo: true},
    {barrio: 'Barrio 65', devas: 'uno', numero: '65', activo: true},
    {barrio: 'Barrio 66', devas: 'uno', numero: '66', activo: true},
    {barrio: 'Barrio 75', devas: 'uno', numero: '75', activo: true},
    {barrio: 'Barrio 76', devas: 'uno', numero: '76', activo: true},
    {barrio: 'Barrio 84', devas: 'uno', numero: '84', activo: true},
    {barrio: 'Barrio 85', devas: 'uno', numero: '85', activo: true},
    {barrio: 'Barrio 93', devas: 'uno', numero: '93', activo: true},
    {barrio: 'Barrio 94', devas: 'uno', numero: '94', activo: true},
  ];

  ngOnInit() {

  }
  ngAfterViewInit() {

    this.storageService.getStorage('area-barrios').then( ( barrios: objStorage[] ) => {
      this.delay.subscribe( () => {
        this.llenarAjustes( barrios );
      } )
    } );

    this.storageService.actualizarAjustes.subscribe( ajustes => {
      if ( ajustes ) {
        this.storageService.getStorage('area-barrios').then( ( barrios: objStorage[] ) => {

          this.delay.subscribe( () => {
            this.llenarAjustes( barrios );
          } )
        } );
      }
    } )
  }


  // =======================
  // Lógica modal ajustes
  // =======================

  aplicarFiltroAjustes() {
    // Aplicar filtro de barrios
    const elements = this.myToggle.nativeElement.children;

    for ( let i = 0; i < elements.length; i++ ) {
      // console.log(elements[i].className);
      this.barrios[i].activo = elements[i].children[1].checked;
    }
    // Guardar cambios en el Storage
    this.storageService.setStorage('area-barrios', this.barrios);

    // Enviar resultado
    this.storageService.actualizarStorage.emit( this.barrios );
    this.openModal.emit( false );


  }

  selecionarTodo( event: boolean ) {
    const elements = this.myToggle.nativeElement.children;

    if ( event ) {
      // Marcar todos los toggles
      for ( let i = 0; i < elements.length; i++ ) {
        this.barrios[i].activo = true;
        this.renderer.setAttribute( elements[i].children[1], 'checked', 'true' );
      }
      // Guardar cambios en el Storage
      this.storageService.setStorage('area-barrios', this.barrios);
    } else {
      // Desmarcar todos los toggles
      for ( let i = 0; i < elements.length; i++ ) {
        this.barrios[i].activo = false;
        this.renderer.setAttribute( elements[i].children[1], 'checked', 'false' );
      }
      this.storageService.setStorage('area-barrios', this.barrios);
    }
  }

  llenarAjustes( data: objStorage[] ) {

    const elements = this.myToggle.nativeElement.children;

    for ( let i = 0; i < elements.length; i++ ) {
      this.renderer.setAttribute( elements[i].children[1], 'checked', String(data[i].activo) );
    }

  }
  devasUno() {
    const elements = this.myToggle.nativeElement.children;

    for ( let i = 0; i < elements.length; i++ ) {

      if ( this.barrios[i].devas === 'uno' ) {
        this.barrios[i].activo = true;
        this.renderer.setAttribute( elements[i].children[1], 'checked', 'true' );
      } else {
        this.barrios[i].activo = false;
        this.renderer.setAttribute( elements[i].children[1], 'checked', 'false' );
      }
    }
    // Guardar cambios en el Storage
    this.storageService.setStorage('area-barrios', this.barrios);

  }
  devasDos() {
    const elements = this.myToggle.nativeElement.children;

    for ( let i = 0; i < elements.length; i++ ) {

      if ( this.barrios[i].devas === 'dos' ) {
        this.barrios[i].activo = true;
        this.renderer.setAttribute( elements[i].children[1], 'checked', 'true' );
      } else {
        this.barrios[i].activo = false;
        this.renderer.setAttribute( elements[i].children[1], 'checked', 'false' );
      }
    }
    // Guardar cambios en el Storage
    this.storageService.setStorage('area-barrios', this.barrios);

  }

  didDismiss() {
    console.log('MODAL DESCARTADO...');
  }

  closemodal() {
    this.openModal.emit( false );
  }

}
