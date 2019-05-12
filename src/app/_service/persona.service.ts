import { Injectable, Host } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Persona } from './../_model/persona';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaCambio = new Subject<Persona[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/personas`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Persona[]>(this.url);
  }

  listarPorId(idPaciente: number) {
    return this.http.get<Persona>(`${this.url}/${idPaciente}`);
  }

  registrar(persona: Persona) {
    return this.http.post<Persona>(this.url, persona);
  }

  modificar(persona: Persona) {
    return this.http.put<Persona>(this.url, persona);
  }

  eliminar(idPersona: number) {
    return this.http.delete<Persona>(`${this.url}/${idPersona}`);
  }
}
