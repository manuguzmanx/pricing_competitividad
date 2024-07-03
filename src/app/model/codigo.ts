export class Codigo {
  private _num_codigo: string;
  private _descripcion: string;
  private _precio_publicado: string;
  private _margen_diferencial: string;
  private _nuevo_precio: string;
  private _nuevo_margen_diferencial: string;
  private _tipo_cambio: string;
  private _vigencia: string;

  constructor(
    num_codigo: string,
    descripcion: string,
    precio_publicado: string,
    margen_diferencial: string,
    nuevo_precio: string,
    nuevo_margen_diferencial: string,
    tipo_cambio: string,
    vigencia: string,
  ) {
    this._num_codigo = num_codigo;
    this._descripcion = descripcion;
    this._precio_publicado = precio_publicado;
    this._margen_diferencial = margen_diferencial;
    this._nuevo_precio = nuevo_precio;
    this._nuevo_margen_diferencial = nuevo_margen_diferencial;
    this._tipo_cambio = tipo_cambio;
    this._vigencia = vigencia;
  }

  // Getters y setters

  get num_codigo(): string {
    return this._num_codigo;
  }

  set num_codigo(value: string) {
    this._num_codigo = value;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  set descripcion(value: string) {
    this._descripcion = value;
  }

  get precio_publicado(): string {
    return this._precio_publicado;
  }

  set precio_publicado(value: string) {
    this._precio_publicado = value;
  }

  get margen_diferencial(): string {
    return this._margen_diferencial;
  }

  set margen_diferencial(value: string) {
    this._margen_diferencial = value;
  }

  get nuevo_precio(): string {
    return this._nuevo_precio;
  }

  set nuevo_precio(value: string) {
    this._nuevo_precio = value;
  }

  get nuevo_margen_diferencial(): string {
    return this._nuevo_margen_diferencial;
  }

  set nuevo_margen_diferencial(value: string) {
    this._nuevo_margen_diferencial = value;
  }

  get tipo_cambio(): string {
    return this._tipo_cambio;
  }

  set tipo_cambio(value: string) {
    this._tipo_cambio = value;
  }

  get vigencia(): string {
    return this._vigencia;
  }

  set vigencia(value: string) {
    this._vigencia = value;
  }
}
