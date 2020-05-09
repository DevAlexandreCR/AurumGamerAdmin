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

  getMatchPlaying() {
    return this.match_collection = this.afs.collection('match', ref => ref.where('state', '==', Constantes.MATCH_PLAYING)) 
  }
}
