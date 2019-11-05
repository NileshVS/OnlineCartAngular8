import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({

    selector:'app-child',
    template:`
    <h3>Child property from parent: {{name}}</h3>
    <h3>Real child property:{{prop}}</h3>
    <button 
    (click)= "transfer()"
    type="button" class="btn btn-info btn-lg">Click to transfer child prop to parent</button>
    `
})

export class Child{
   @Input() public name = "empty";
   public prop = "Nilesh";
   @Output() childProp = new EventEmitter();

    constructor(){}
    transfer(){
        this.childProp.emit(this.prop);
    }
}