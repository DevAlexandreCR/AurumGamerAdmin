import { Player } from './Player'
import { Score } from './Score'

/**
 * Declaro el objeto Partida
 */
export class Match {

    id: string // generado automaticamente por firebase
    date_add: Date
    local: Player
    visitante: Player
    oro: number // valor del reto en oro
    platform_match: string // PS4, XBOXONE, PC
    game: string // FIFA20, FIFA19, PES20, PES19
    score: Score
    winner: string
    state: string


    constructor() {
        this.score = {local: 0, visitante: 0}
        this.local = new Player()
        this.visitante = new Player()
    }
}