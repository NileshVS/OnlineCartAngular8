import {Component, Input} from '@angular/core';

@Component({

    selector:'app-parent',
    template:`
    <h1>Real parent property: {{user.name}}</h1>
    <h1>Parent property from child: {{parentProp}}</h1>
    <app-child 
    [name]="user.name"
    (childProp) = "addProp($event)"
    ></app-child>
    `
})

export class Parent{
    @Input() public user = {
        name:'Vasant'
    }
    public parentProp="empty"
    addProp(item){
        this.parentProp=item;
    }
    constructor(){}
}