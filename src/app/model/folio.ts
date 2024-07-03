import { Codigo } from './codigo';

export class Folio {
  private _num_folio: string;
  private _fecha: string;
  private _estatus: string;
  private _macrocategoria: string;
  private _categoria: string;
  private _subcategoria: string;
  private _clase: string;
  private _familia: string;
  private _proveedor: string;
  private _codigo: Array<Codigo>;

  constructor(
    num_folio: string,
    fecha: string,
    estatus: string,
    macrocategoria: string,
    categoria: string,
    subcategoria: string,
    clase: string,
    familia: string,
    proveedor: string,
    codigo: Array<Codigo>
  ) {
    this._num_folio = num_folio;
    this._fecha = fecha;
    this._estatus = estatus;
    this._macrocategoria = macrocategoria;
    this._categoria = categoria;
    this._subcategoria = subcategoria;
    this._clase = clase;
    this._familia = familia;
    this._proveedor = proveedor;
    this._codigo = codigo;
  }

  // Getters y setters

  get num_folio(): string {
    return this._num_folio;
  }

  set num_folio(value: string) {
    this._num_folio = value;
  }

  get fecha(): string {
    return this._fecha;
  }

  set fecha(value: string) {
    this._fecha = value;
  }

  get estatus(): string {
    return this._estatus;
  }

  set estatus(value: string) {
    this._estatus = value;
  }

  get macrocategoria(): string {
    return this._macrocategoria;
  }

  set macrocategoria(value: string) {
    this._macrocategoria = value;
  }

  get categoria(): string {
    return this._categoria;
  }

  set categoria(value: string) {
    this._categoria = value;
  }

  get subcategoria(): string {
    return this._subcategoria;
  }

  set subcategoria(value: string) {
    this._subcategoria = value;
  }

  get clase(): string {
    return this._clase;
  }

  set clase(value: string) {
    this._clase = value;
  }

  get familia(): string {
    return this._familia;
  }

  set familia(value: string) {
    this._familia = value;
  }

  get proveedor(): string {
    return this._proveedor;
  }

  set proveedor(value: string) {
    this._proveedor = value;
  }

  get codigo(): Array<Codigo> {
    return this._codigo;
  }

  set codigo(value: Array<Codigo>) {
    this._codigo = value;
  }

}
