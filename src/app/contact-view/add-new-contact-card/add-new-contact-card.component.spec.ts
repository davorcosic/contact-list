import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewContactCardComponent } from './add-new-contact-card.component';

describe('AddNewContactCardComponent', () => {
  let component: AddNewContactCardComponent;
  let fixture: ComponentFixture<AddNewContactCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewContactCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewContactCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
