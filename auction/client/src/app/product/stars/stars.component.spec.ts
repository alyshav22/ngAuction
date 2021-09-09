import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsComponent } from './stars.component';

describe('StarsComponent', () => {
  let component: StarsComponent;
  let fixture: ComponentFixture<StarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('is successfully injected', () => {
    const component = TestBed.createComponent(StarsComponent).componentInstance;
    expect(component instanceof StarsComponent).toEqual(true);
  });

  it('readonly property is true by default', () => {
    let component = TestBed.createComponent(StarsComponent).componentInstance;
    expect(component.readonly).toEqual(true);
  });

  it('all stars are empty', () => {
    let fixture = TestBed.createComponent(StarsComponent);
    let element = fixture.nativeElement;
    let cmp = fixture.componentInstance;
    cmp.rating = 0;

    fixture.detectChanges();

    let selector = '.material-icons';
    expect(element.querySelectorAll(selector).length).toBe(5);
  });

  it('all stars are filled', () => {
    let fixture = TestBed.createComponent(StarsComponent);
    let element = fixture.nativeElement;
    let cmp = fixture.componentInstance;
    cmp.rating = 5;

    fixture.detectChanges();

    let selector = '.material-icons:not(.material-icons-empty)';
    expect(element.querySelectorAll(selector).length).toBe(5);
  });



});
