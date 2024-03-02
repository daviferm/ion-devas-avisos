import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { ItemAlarmasComponent } from './item-alarmas/item-alarmas.component';
import { FormsModule } from '@angular/forms';
import { ModalAjustasComponent } from './modal-ajustas/modal-ajustas.component';
import { AlertDetallesComponent } from './alert-detalles/alert-detalles.component';
import { ModalListaIconosComponent } from './modal-lista-iconos/modal-lista-iconos.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    MapComponent,
    ItemAlarmasComponent,
    ModalAjustasComponent,
    AlertDetallesComponent,
    ModalListaIconosComponent,
  ],
  exports: [
    MapComponent,
    ItemAlarmasComponent,
    ModalAjustasComponent,
    AlertDetallesComponent,
    ModalListaIconosComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule,
    GoogleMapsModule
  ]
})
export class ComponentsModule { }
