export class Constantes {

    /**
     * contantes de los estados de una partida
     */
    public static MATCH_CREATED = 'created'
    public static MATCH_PLAYING = 'playing'
    public static MATCH_END = 'end' 

    /**
     * constantes local y visitante
     */
    public static MATCH_LOCAL = 'local'
    public static MATCH_VISITANTE = 'visitante'

    /**
     * Plataformas de juego
     */
    public static PS4 = 'PS4'
    public static PC = 'PC'
    public static XBOXONE = 'XBOXONE'

    /**
     * Juegos disponibles
     */

    public static GAME_FIFA19 = 'FIFA19'
    public static GAME_FIFA20 = 'FIFA20'
    public static GAME_PES19 = 'PES19'
    public static GAME_PES20 = 'PES20'
    public static GAMES = {fifa19: 'FIFA19', fifa20: 'FIFA20', pes19: 'PES19',pes20: 'PES20'}

    /**
     * rutas de base de datos
     */
    public static MATCH_COLLECTION = 'match'
    public static PLAYER_COLLECTION = 'player'
    public static SELECCIONE_UNO = 'seleccione uno' // para elegir el ganador del match

}