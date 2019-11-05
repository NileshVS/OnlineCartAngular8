import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBasicsComponent } from './ng-basics.component';

describe('NgBasicsComponent', () => {
  let component: NgBasicsComponent;
  let fixture: ComponentFixture<NgBasicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBasicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
