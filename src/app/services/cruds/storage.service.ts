import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor( private storage: AngularFireStorage) { }

  /**
   * subir archivo a storage
   * @param ref referencia del archivo 
   * @param file archivo a subir
   */
  upload(ref: string, data:any) {
    return this.storage.upload(ref, data)
  }

  getReference(ruta: string): AngularFireStorageReference {
    return this.storage.ref(ruta)
  }

}
