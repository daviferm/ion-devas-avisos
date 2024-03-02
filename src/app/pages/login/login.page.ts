import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  private router = inject( Router );

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

}
