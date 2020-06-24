import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from "@angular/common/http";

import {map} from "rxjs/operators";

import {Observable} from "rxjs";




@Injectable()

export class TareasService {
  url = "http://localhost:3000/api/"
  constructor(private _http: HttpClient) {}


 // SERVICIO CREAR TAREA
 crearTarea(tareaNueva){
  let params = JSON.stringify(tareaNueva);
  let options = {
    headers: new HttpHeaders({ "Content-Type" : "applications/json" }),
    };
  return this._http.post(this.url, params, options).pipe(map((res) => res));
}

// SERVICIO OBTENER TAREA
obtenerTareas(){
return this._http.get(this.url).pipe(map((res) => res));

}

// SERVICIO ACTUALIZAR TAREA

actualizarTarea(idTarea, tareaActualizada){ 
let params = JSON.stringify(tareaActualizada);
let options = {
  headers: new HttpHeaders({
    "Content-Type": "application/json" 
  }),
};
return this._http.put(this.url +  idTarea, params, options).pipe(map((res) => res));
}


// SERVICIO ELIMINAR TAREA
    eliminarTarea(idTarea) {
      let options = {
      headers: new HttpHeaders({"Content-Type": "application/json"}),
    };
    return this._http.delete(this.url + idTarea,options).pipe(map((res) => res));
 } 
}



