import { Injectable, Host } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Producto } from '../_model/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productosCambio = new Subject<Producto[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/productos`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Producto[]>(this.url);
  }

  listarPorId(idProducto: number) {
    return this.http.get<Producto>(`${this.url}/${idProducto}`)
  }

  registrar(producto: Producto) {
    return this.http.post<Producto>(this.url, producto);
  }

  modificar(producto: Producto) {
    return this.http.put<Producto>(this.url, producto);
  }

  eliminar(idProducto: number) {
    return this.http.delete<Producto>(`${this.url}/${idProducto}`)
  }

}
