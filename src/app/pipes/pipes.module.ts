import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconUrlPipe } from './icon-url.pipe';
import { DomseguroPipe } from './domseguro.pipe';
import { ImgItemPipe } from './img-item.pipe';
import { ConvertFechaPipe } from './convert-fecha.pipe';



@NgModule({
  declarations: [
    IconUrlPipe,
    DomseguroPipe,
    ImgItemPipe,
    ConvertFechaPipe
  ],
  exports: [
    IconUrlPipe,
    ImgItemPipe,
    DomseguroPipe,
    ConvertFechaPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
