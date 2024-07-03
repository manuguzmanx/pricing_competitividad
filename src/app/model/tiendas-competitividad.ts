export class TiendasCompetitividad {
  private _codigo: string;
  private _nombreTienda: string;
  private _precioRegular: number|null;
  private _precioPromocion: number|null;

  constructor(
    codigo: string,
    nombreTienda: string,
    precioRegular: number|null,
    precioPromocion: number|null
  ) {
    this._codigo = codigo;
    this._nombreTienda = nombreTienda;
    this._precioRegular = precioRegular;
    this._precioPromocion = precioPromocion;
  }

  // Getters
  get codigo(): string {
    return this._codigo;
  }

  get nombreTienda(): string {
    return this._nombreTienda;
  }

  get precioRegular(): number|null {
    return this._precioRegular;
  }

  get precioPromocion(): number|null {
    return this._precioPromocion;
  }


  // Setters
  set codigo(value: string) {
    this._codigo = value;
  }

  set nombreTienda(value: string) {
    this._nombreTienda = value;
  }

  set precioRegular(value: number|null) {
    this._precioRegular = value;
  }

  set precioPromocion(value: number|null) {
    this._precioPromocion = value;
  }

}
