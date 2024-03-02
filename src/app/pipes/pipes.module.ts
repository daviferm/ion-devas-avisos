import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconUrlPipe } from './icon-url.pipe';
import { DomseguroPipe } from './domseguro.pipe';
import { ImgItemPipe } from './img-item.pipe';



@NgModule({
  declarations: [
    IconUrlPipe,
    DomseguroPipe,
    ImgItemPipe
  ],
  exports: [
    IconUrlPipe,
    ImgItemPipe,
    DomseguroPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
