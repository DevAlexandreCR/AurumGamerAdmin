import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { PlayerService } from '../services/cruds/player.service';
import { Player } from '../Constantes/Player';
import { Match } from '../Constantes/Match';
import { MatchService } from '../services/cruds/match.service';
import { ToastrService } from 'ngx-toastr';
import { Constantes } from '../Constantes/Constantes';
import { StorageService } from '../services/cruds/storage.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  players: Player[]
  matches: Match[]
  /** partida seleccionada, ya sea para crear o editar */
  local_phone: string = ''
  visitante_phone: string = ''
  score_local: number = 0
  score_visitante: number = 0
  filtro_player_local: Player[] = []
  filtro_player_visitante: Player[] = []
  my_match: Match = new Match()
  /** para saber si se crea una partida o si se agrega una nueva */
  editing: boolean = false
  /** para saber si se esta terminando la partida */
  ending: boolean = false

  /** usado para buscar un jugador para recargas */
  phone_player: string
  player_selected: Player
  oro_reload: number = 0
  /** para ver el procentage de carga del comprobante de pagos */
  porcentaje: number = 0
  comprobante: any = null

  constructor(private authService: AuthService, private playerService: PlayerService, 
              private matchService: MatchService, private toast: ToastrService, private storage: StorageService) {
                this.resetMatch()
               }

  ngOnInit(): void {

    /**
     * traemos la lista de los jugadores y quedamos a la escucha de cualquier cambio
     * para que se actualice automaticamente
     */
    this.playerService.getPlayersCollection().valueChanges().subscribe(players => {
      this.players = players
      console.log(this.players)
    })

    /**
     * traemos la lista de las partidas y quedamos a la escucha de cualquier cambio
     * para que se actualice automaticamente
     */
    this.matchService.getMatchPlaying().valueChanges().subscribe( matches => {
      this.matches = matches
      console.log(matches);
      
    })

  }

  /**
   * funcion que prepara el sistema para la edicion de una partida
   * @param match partida seleccionada
   */
  editingMatch(isEditing: boolean, match?: Match) {
    this.editing = isEditing
    this.ending = false
    if (isEditing) { 
      this.my_match = match
      this.local_phone = this.my_match.local.phone
      this.visitante_phone = this.my_match.visitante.phone
    }
    else { 
      this.resetMatch()
    }
  }
  /**
   * 
   * @param isEnding se va a terminar la partida?
   */
  endingMatch(isEnding: boolean, match: Match) {
    this.my_match = match
    this.ending = isEnding
    this.local_phone = this.my_match.local.phone
    this.visitante_phone = this.my_match.visitante.phone
  }
  /**
   * funcion para editar o crear una partida
   * @param match partida seleccionada
   * @param editing si es true entonces edita una partida, si false entonces crea una nueva
   */
  setMatch(match: Match, editing: boolean) {
    if ( this.validMatch(match, false) ) {
      match.state = Constantes.MATCH_PLAYING
      if (editing){ // para editar partida
        this.matchService.updateMatch(match).then(()=>{
          this.toast.success('Partida guardada correctamente', 'Edición terminada')
          this.resetMatch()
        }).catch(reason =>{
          this.toast.error(reason, 'ha ocurrido un error')
        })
      } else { // para agregar partida
        this.matchService.addMatch(match).then(()=>{
          this.toast.success('Partida agregada correctamente', 'Creación terminada')
        }).catch(reason =>{
          this.toast.error(reason, 'ha ocurrido un error')
        })  
      }
    }
  }

  /**
   * funcion que termina la partida asignando un ganador
   * @param match partida a terminar
   */
  endMatch(match: Match) {
    if (this.validMatch(match, true) ) {
      match.state = Constantes.MATCH_END
      /**
       * si no se agrego marcador, entonces asignamos la diferencia minima al partido
       */
      if (this.score_local == 0 && this.score_visitante == 0) {
        if ( match.winner == Constantes.MATCH_LOCAL) { match.score.local = 1; match.score.visitante = 0 }
        else { match.score.local = 0; match.score.visitante = 1 }
      } else { match.score.local = this.score_local; match.score.visitante = this.score_visitante}
      this.matchService.updateMatch(match).then(()=>{
        this.toast.success('Partida guardada correctamente', 'Edición terminada')
        this.resetMatch()
      }).catch(reason =>{
        this.toast.error(reason, 'ha ocurrido un error')
      })
    }
  }

  /**
   * valida que los datos de la partida sean correctos
   * @param match 
   * @param endingMatch si true verifica ganador default es false
   */
  validMatch(match: Match, endingMatch: boolean): boolean {
    if (!endingMatch) {
      if (match.local.name != undefined && match.visitante.name != undefined) {
        if (match.oro > 1000){ return true}
        else { this.toast.error('Agregue una cantidad válida', 'Agregue oro'); return false}
      } else { this.toast.error('selesccione un jugador', 'No seleccionó jugador'); return false}
    }
    else {
      if (match.winner != undefined) { return true}
      else { this.toast.error('selesccione un ganador', 'No seleccionó ganador'); return false }
    }
  }

  /**
   * para que no se escriban letras en el telefono devuelve falso si no se escribe un numero
   * @param str string a validar
   */
  isDigit(str: string) {
    return str && !/[^\d]/.test(str);
  }

  /**
   * funcion que busca un player por su numero de telefono
   * @param phone telefono a buscar
   */
  findPlayerByPhone(isLocalOrVisitor: string, phone: string) {
    if (phone == undefined) return
    this.filtro_player_local = []
    this.filtro_player_visitante = []
    for (const i in this.players) {
      if (this.players.hasOwnProperty(i)) {
        if (this.players[i] == undefined) { return }
        const player = this.players[i];
        if (phone.length > 1 && player.phone != undefined && player.phone.indexOf(phone) > -1){
          switch (isLocalOrVisitor) {
            case Constantes.MATCH_LOCAL:
              this.filtro_player_local.push(player)
              break;
            case Constantes.MATCH_VISITANTE:
              this.filtro_player_visitante.push(player)
              break
            default:
              break;
          }   
          console.log(this.filtro_player_local);
        }
      }
    }
  }

  /**
   * selecciona un jugador para agregarlo a la partida
   * @param player jugador seleccionado
   * @param match partida para agregar el jugador
   * @param isLocalOrVisitor define si el jugador es el local o el visitante
   */
  selectPlayer(player: Player, match: Match, isLocalOrVisitor: string) {
    switch (isLocalOrVisitor) {
      case Constantes.MATCH_LOCAL:
        match.local = player
        this.local_phone = player.phone
        this.filtro_player_local = []
        break;
      case Constantes.MATCH_VISITANTE:
        match.visitante = player
        this.visitante_phone = player.phone
        this.filtro_player_visitante = []
        break
      default:
        this.phone_player = player.phone
        this.player_selected = player
        this.filtro_player_local = []
        break;
    }   
  }

  /**
   * cerrar sesion y salir del main
   */
  logout(){
    this.authService.logout()
  }

  /**
   * vovlemos los valor de la partida a 0
   */
  resetMatch() {
    this.my_match = new Match()
    this.editing = false
    this.ending = false
    this.score_local = 0
    this.score_visitante = 0
    this.local_phone = ''
    this.visitante_phone = ''
    this.phone_player = ''
    this.player_selected = new Player()
    this.oro_reload = 0
  }

  verFecha(date: firebase.firestore.Timestamp): string {    
    let  fecha = date.toDate()
    let dd = fecha.getDate()
        let mm = fecha.getMonth() + 1;
        let yyyy = fecha.getFullYear();
        let hh = fecha.getHours()
        let min = fecha.getMinutes()
        dd = this.addZero(dd);
        mm = this.addZero(mm);
 
        return dd+'/'+mm+'/'+':'+hh+':'+min;
  }

  /**
   * funcion para agregar un cero a los dias y meses
   * @param i dia o mes
   */
  addZero(i: any) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

recargarSaldo(player: Player, oro: number) {
  console.log('recargar saldo', player);
  player.balance += oro 
  let name = new Date().toString()
  let id_player = player.id
  let ruta = `${Constantes.RUTA_COMPROBANTES}/${id_player}/${name}`
  let ref = this.storage.getReference(ruta)
  let task = this.storage.upload(ruta, this.comprobante)
  task.percentageChanges().subscribe(porcentaje => {
    this.porcentaje = Math.round(porcentaje)
    if (this.porcentaje == 100) {
      this.porcentaje = 0
      this.comprobante = null
      console.log(ref.getDownloadURL())
      this.playerService.updatePlayer(player).then(()=>{
        this.toast.success('Saldo cargado al jugador', 'Recarga exitosa!')
        this.player_selected = new Player()
        this.oro_reload = 0
        this.phone_player = ''
      }).catch(rej => {
        this.toast.error(rej, 'Error al cargar el saldo')
      })
    }
  })
}

/** guarda el archivo seleccionado en la variable comprobante */
selectFile(event) {
  if (event.target.files.length > 0) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.comprobante = event.target.files[i]         
    }
  }
}

}
