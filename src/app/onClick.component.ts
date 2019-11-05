import {Component} from '@angular/core'; 

@Component({
    selector: 'app-onclick',
    template:`
    <h3
    [style.color] = " isActive ? 'green' : 'red'"
    (click) = "Action()"
    > Click Me!</h3>
    <button type= "button" class="btn btn-danger"
    [class.btn-danger]="!isActive"
    [class.btn-info]="isActive"
    >Click Me!</button>
    <span class="glyphicon glyphicon-star-empty"
    style="font-size:30px;"
    [class.glyphicon-star-empty] ="isActive"
    [class.glyphicon-star] ="!isActive"
    ></span>

    `
})

export class OnClick{
    isActive: Boolean = false;
    prop = "block";
    constructor(){}
    Action(){
        this.isActive=!this.isActive;
    }
}