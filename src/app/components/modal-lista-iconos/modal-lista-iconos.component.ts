import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-lista-iconos',
  templateUrl: './modal-lista-iconos.component.html',
  styleUrls: ['./modal-lista-iconos.component.scss'],
})
export class ModalListaIconosComponent implements OnInit {

  // @Output() openModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cerrarModal: EventEmitter<boolean> = new EventEmitter();

  @Input() isModalOpen = false;

  constructor() { }

  ngOnInit() {}

  didDismiss( isOpen: boolean ) {
    this.isModalOpen = isOpen;
    this.cerrarModal.emit( isOpen )
  }

  setOpen(isOpen: boolean) {this.isModalOpen = isOpen}

}
