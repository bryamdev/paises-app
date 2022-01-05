import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  
  @Input() fuente: string = '';

  //Subject: oservable creado manualmente para controlar el DebounceTime
  //Esto se emitira cuando el usuario deje de escribir
  debouncer: Subject<string> = new Subject();

  termino: string = '';

  get placeHolderText(){
    return `Buscar ${this.fuente}...`;
  }

  //se dispara una unica vez cuando component es creado e inicializado
  ngOnInit(): void {
    //en el pipe se especifico un tiempo de 300 mls de espera para que el observable emita el siguiente valor
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe( valor => {
        this.onDebounce.emit(valor);
      //console.log("debouncer: ", valor )
    });
    //console.log("From ngOnInit pais input!");
  }

  constructor() { }

  buscar(){
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(){
    //console.log(event.target.value);
    this.debouncer.next(this.termino);
  }

}
