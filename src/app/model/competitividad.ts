import { TiendasCompetitividad } from "./tiendas-competitividad";

export class Competitividad {
  private _codigo: string;
  private _descripcion: string;
  private _coppel: TiendasCompetitividad;

  private _precioMasCompetitivo: number|null;
  private _diferencialMargen: number;
  private _diferencialUtilidad: number;

  private _precioSugeridoPorcentaje: number|null;
  private _enviarPrecio: boolean;

  private _amazon: TiendasCompetitividad;
  private _aurrera: TiendasCompetitividad;
  private _chedraui: TiendasCompetitividad;
  private _liverpool: TiendasCompetitividad;
  private _clase:string;
  private _departamento:string;
  private _marca:string;
  private _modelo:string;
  private _diasTranscurridos:number;

  constructor(
    codigo: string,
    descripcion: string,
    coppel: TiendasCompetitividad,
    precioMasCompetitivo: number|null,
    diferencialMargen: number,
    diferencialUtilidad: number,
    precioSugeridoPorcentaje: number|null,
    enviarPrecio: boolean,
    amazon: TiendasCompetitividad,
    aurrera: TiendasCompetitividad,
    chedraui: TiendasCompetitividad,
    liverpool: TiendasCompetitividad,
    clase:string,
    departamento:string,
    marca:string,
    modelo:string,
    diasTranscurridos:number
  ) {
    this._codigo = codigo;
    this._descripcion = descripcion;
    this._coppel = coppel;
    this._precioMasCompetitivo = precioMasCompetitivo;
    this._diferencialMargen = diferencialMargen;
    this._diferencialUtilidad = diferencialUtilidad;
    this._precioSugeridoPorcentaje = precioSugeridoPorcentaje;
    this._enviarPrecio = enviarPrecio;
    this._amazon = amazon;
    this._aurrera = aurrera;
    this._chedraui = chedraui;
    this._liverpool = liverpool;
    this._clase = clase;
    this._departamento = departamento;
    this._marca = marca;
    this._modelo = modelo;
    this._diasTranscurridos = diasTranscurridos;
  }

  // Getters y setters
  get codigo(): string {
    return this._codigo;
  }

  set codigo(value: string) {
    this._codigo = value;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  set descripcion(value: string) {
    this._descripcion = value;
  }

  get coppel(): TiendasCompetitividad {
    return this._coppel;
  }

  set coppel(value: TiendasCompetitividad) {
    this._coppel = value;
  }

  get precioMasCompetitivo(): number|null {
    return this._precioMasCompetitivo;
  }

  set precioMasCompetitivo(value: number|null) {
    this._precioMasCompetitivo = value;
  }

  get diferencialMargen(): number {
    return this._diferencialMargen;
  }

  set diferencialMargen(value: number) {
    this._diferencialMargen = value;
  }

  get diferencialUtilidad(): number {
    return this._diferencialUtilidad;
  }

  set diferencialUtilidad(value: number) {
    this._diferencialUtilidad = value;
  }

  get precioSugeridoPorcentaje(): number|null {
    return this._precioSugeridoPorcentaje;
  }

  set precioSugeridoPorcentaje(value: number|null) {
    this._precioSugeridoPorcentaje = value;
  }

  get enviarPrecio(): boolean {
    return this._enviarPrecio;
  }

  set enviarPrecio(value: boolean) {
    this._enviarPrecio = value;
  }

  get amazon(): TiendasCompetitividad {
    return this._amazon;
  }

  set amazon(value: TiendasCompetitividad) {
    this._amazon = value;
  }

  get aurrera(): TiendasCompetitividad {
    return this._aurrera;
  }

  set aurrera(value: TiendasCompetitividad) {
    this._aurrera = value;
  }

  get chedraui(): TiendasCompetitividad {
    return this._chedraui;
  }

  set chedraui(value: TiendasCompetitividad) {
    this._chedraui = value;
  }

  get liverpool(): TiendasCompetitividad {
    return this._liverpool;
  }

  set liverpool(value: TiendasCompetitividad) {
    this._liverpool = value;
  }

  get clase(): string {
    return this._clase;
  }

  set clase(value: string) {
    this._clase = value;
  }

  get departamento(): string {
    return this._departamento;
  }

  set departamento(value: string) {
    this._departamento = value;
  }

  get marca(): string {
    return this._marca;
  }

  set marca(value: string) {
    this._marca = value;
  }

  get modelo(): string {
    return this._modelo;
  }

  set modelo(value: string) {
    this._modelo = value;
  }

  get diasTranscurridos(): number {
    return this._diasTranscurridos;
  }

  set diasTranscurridos(value: number) {
    this._diasTranscurridos = value;
  }
}
