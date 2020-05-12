import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { Match } from 'src/app/Constantes/Match';
import { Constantes } from 'src/app/Constantes/Constantes';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  match_collection: AngularFirestoreCollection<Match>
  match_doc: AngularFirestoreDocument<Match>

  constructor(private afs: AngularFirestore) { }

  /**
   * devuelve un pobservable de las partidas en juego
   */
  getMatchPlaying() {
    return this.match_collection = this.afs.collection('match', ref => ref.where('state', '==', Constantes.MATCH_PLAYING)) 
  }

  /**
   * edicion de la partida
   * @param match partida con los datos nuevos
   */
  updateMatch(match: Match) {
    this.match_doc = this.afs.doc<Match>(`${Constantes.MATCH_COLLECTION}/${match.id}`)
    return this.match_doc.update( Object.assign({}, match) )
  }

  /**
   * Crear nueva partida
   * @param match partida nueva
   */
  addMatch(match: Match) {
    const id = this.afs.createId()
    match.id = id
    match.date_add = new Date()
    const match_collection = this.afs.collection<Match>(Constantes.MATCH_COLLECTION)
    return match_collection.doc(id).set( Object.assign({}, match) )
  }


}
