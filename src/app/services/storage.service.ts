import { Injectable, EventEmitter, signal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { objStorage } from '../interfaces/alarmas.interface';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  actualizarStorage: EventEmitter<objStorage[]> = new EventEmitter();
  public actualizarAjustes = new EventEmitter<boolean>();

  private _storage: Storage | null = null;


  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Método para insertar un registro en Storage
  public setStorage(key: string, value: any) {
    this._storage?.set(key, value);
  }

  // Método para acceder a un registro del Storage
  public getStorage(key: string): Promise<objStorage[]> {
    return this._storage!.get( key );
  }

  //*? =================================================
  //*? Local Storage
  //*? =================================================
  setLocalStorage( key: string, value: string ) {
    // Guardamos la lista de tareas en localStorage
    localStorage.setItem( key, value);
  }

  public getLocalStorage( key: any ) {
    return localStorage.getItem( key );
  }

}
