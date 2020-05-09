import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { Player } from 'src/app/Constantes/Player';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore/public_api';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player_collection: AngularFirestoreCollection<Player>
  player_doc: AngularFirestoreDocument<Player>

  constructor(private afs: AngularFirestore) { }

  /**
   * funcion devuelve una observable de jugadores
   */
  getPlayersCollection() {
    return this.player_collection = this.afs.collection<Player>('player')
  }

  /**
   * Funcion que retorna un jugador
   * @param id id de firebase 
   */
  getPlayerById(id: string) {
    return this.player_doc = this.afs.doc<Player>(`player/${id}`)
  }
}
