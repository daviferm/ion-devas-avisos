import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlarmasService } from 'src/app/services/alarmas.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  private router = inject( Router );
  private alarmasService = inject( AlarmasService );

  texto!: string;
  tokenId!: string;

  constructor() {}



  enviarCodigo( event:any ) {

    event.preventDefault();

    if ( !this.texto ) {
      console.log('Escribe la dirección..');
      return;
    }
    if ( this.texto && this.texto.length < 10 ) {
      console.log('Código error!!!');
      return;
    }
    this.tokenId = this.texto.split('=')[1];
    if ( !this.tokenId ) {
      console.log('Código undefined!!');
      this.texto = '';
      return;
    }
    if ( this.tokenId ) {
      this.router.navigate(['./home', this.tokenId]);
      this.texto = '';
    }
  }

  mostrarAyuda() {
    this.router.navigate(['instrucciones']);
  }

  seletServer( event: any ) {
    if ( event.detail == 'clouding' ) {
      this.alarmasService.URL_ALARMAS = this.alarmasService.URL_BACKDVS;
    } else {
      this.alarmasService.URL_ALARMAS = this.alarmasService.URL_FIREBASE;
    }
  }

}
