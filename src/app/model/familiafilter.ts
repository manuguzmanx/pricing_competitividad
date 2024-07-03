export class Familiafilter {
  private _codigo: string;
  private _nombre: string;

  constructor(
    codigo: string,
    nombre: string
  ) {
    this._codigo = codigo;
    this._nombre = nombre;
  }

  // Getters y setters


  get codigo(): string {
    return this._codigo;
  }

  set codigo(value: string) {
    this._codigo = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }
}
