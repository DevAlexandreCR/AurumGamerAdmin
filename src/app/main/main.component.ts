import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { PlayerService } from '../services/cruds/player.service';
import { Player } from '../Constantes/Player';
import { Match } from '../Constantes/Match';
import { MatchService } from '../services/cruds/match.service';
import { ToastrService } from 'ngx-toastr';
import { Constantes } from '../Constantes/Constantes';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  players: Player[]
  matches: Match[]
  /**
   * partida seleccionada, ya sea para crear o editar
   */
  local_phone: string = ''
  visitante_phone = ''
  filtro_player_local: Player[] = []
  filtro_player_visitante: Player[] = []
  my_match: Match = new Match()
  /**
   * para saber si se crea una partida o si se agrega una nueva
   */
  editing: boolean = false
  /**
   * para saber si se esta terminando la partida
   */
  ending: boolean = false

  constructor(private authService: AuthService, private playerService: PlayerService, 
              private matchService: MatchService, private toast: ToastrService) {
                this.my_match.local = new Player()
                this.my_match.visitante = new Player()
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
    this.matchService.getMatchPlaying().valueChanges(matches => {
      this.matches = matches
      console.log(this.matches);
      
    })

  }

  /**
   * funcion que prepara el sistema para la edicion de una partida
   * @param match partida seleccionada
   */
  editingMatch(isEditing: boolean, match?: Match) {
    this.editing = isEditing
    if (isEditing) { this.my_match = match}
    else { this.my_match = new Match()}
  }

  /**
   * 
   * @param isEnding se va a terminar la partida?
   */
  endingMatch(isEnding: boolean) {
    this.ending = isEnding
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
          this.editing = false
          this.ending = false
          this.my_match = new Match()
          this.my_match.local = new Player()
          this.my_match.visitante = new Player()
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
  endMatch(match) {
    if (this.validMatch(match, true) ) {
      match.state = Constantes.MATCH_END
      this.matchService.updateMatch(match).then(()=>{
        this.toast.success('Partida guardada correctamente', 'Edición terminada')
        this.editing = false
        this.ending = false
        this.my_match = new Match()
        this.my_match.local = new Player()
        this.my_match.visitante = new Player()
      }).catch(reason =>{
        this.toast.error(reason, 'ha ocurrido un error')
      })
    }
  }

  /**
   * valida que los datos de la partida sean correctos
   * @param match 
   * @param editing 
   */
  validMatch(match: Match, endingMatch: boolean): boolean {
    if (!endingMatch) {
      if (match.local != undefined && match.visitante != undefined) {
        if (match.oro > 1000){ return true}
        else { this.toast.error('Agregue una cantidad válida', 'Agregue oro'); return false}
      } else { this.toast.error('selesccione un jugador', 'No seleccionó jugador'); return false}
    }
    else {
      if (match.winner != '') { return true}
      else { this.toast.error('selesccione un ganador', 'No seleccionó ganador'); return false }
    }
  }

  /**
   * funcion que busca un player por su numero de telefono
   * @param phone telefono a buscar
   */
  findPlayerByPhone(isLocalOrVisitor: string, phone: string) {
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
        break;
    }    
  }

  /**
   * cerrar sesion y salir del main
   */
  logout(){
    this.authService.logout()
  }

}
