import { Component, OnInit } from '@angular/core';

import {Tareas} from "../../models/tareas"
import {TareasService} from "../../services/tareas.service"

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  public tareasRegistrada: Tareas;
  public tareasEncontradas: any = [];

  constructor(private tareaService: TareasService) {
    this.tareasRegistrada = new Tareas ("","","","")
 }

  ngOnInit(): void {
    this.mostrarTareas();
  }

  //consumo Servicio crear tarea con el metodo agregarTarea
  agregarTarea() {
    this.tareaService.crearTarea(this.tareasRegistrada).subscribe(
      (response:any) => {
        let tareas = response.tarea;
        this.tareasRegistrada = tareas;
        if(!this.tareasRegistrada._id){
          alert("Error al registrar tarea");
        } else {
          alert(`Registro Exitoso!!, ${this.tareasRegistrada.nombreEncargado} tiene una nueva tarea`);
          
          this.tareasRegistrada = new Tareas ("","","","");
          this.mostrarTareas();
        }
      },
      (error) => {
        var errormensaje = <any>error;
        if(errormensaje != null) {
          console.log(error);
        }
      }
    );
   }

   //Consumo de servicio obter tarea con el método mostrar Tareas
      
    mostrarTareas(){
      this.tareaService.obtenerTareas().subscribe(
        (response: any) =>{
        this.tareasEncontradas = response.tareas;
      },
      (error) => {
      var errormensaje = <any>error;
      if(errormensaje != null) {
        console.log(error);
       }
     }
   );
  }


  //Consumo de servico actualizar Tarea con el método editar Tarea

    editarTarea(tarea){
    this.tareaService.actualizarTarea(tarea._id, tarea).subscribe
    (
      (response: any) => {
        if(response.tarea){
          alert("la tarea ha sido actualizada correctamente")
          this.mostrarTareas();
        }else{
        alert("No fue posible actualizar la tarea");
        }
      },
      (error) => {
        if(error != null){
          console.log(error);
         }
       }
     );
    }

    
  
  //Consumo de servicio eliminar Tarea con el método eliminar Tarea

    eliminarTarea(idTarea){
      this.tareaService.eliminarTarea(idTarea).subscribe(
        (response: any) => {
          if(response.tarea){
            alert("La tarea ha sido eliminada correctamente!!")
            this.mostrarTareas();
          }else{
          alert("No fue posible eliminar la tarea");
          }
        },
        (error) => {
          if(error != null){
            console.log(error);
           }
         }
      );
    }  
}
