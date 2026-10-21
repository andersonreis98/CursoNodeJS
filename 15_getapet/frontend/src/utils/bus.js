// EventEmitter permite emitir e ouvir eventos (como no Node)
import EventEmitter from "events";
// exporta uma única instância compartilhada: um "barramento" de eventos usado pelas mensagens flash
export default new EventEmitter();
