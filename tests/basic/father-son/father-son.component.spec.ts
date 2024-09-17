import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherSonComponent } from '../../../src/app/basic/father-son/father-son.component';

describe('FatherSonComponent', () => {
  let component: FatherSonComponent;
  let fixture: ComponentFixture<FatherSonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherSonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FatherSonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debe de hacer match con el snapshot', () => {
      expect(compiled).toMatchSnapshot();
  });

  test('No deben de aparecer botones si no hay cliente', () => {
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  test('Deben de aparecer 2 botones si hay cliente', () => {
    component.client = {id: 1, name: 'maria'};
    fixture.detectChanges();
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  test('Debe de emitir onDeleteClient con el boton de eliminar', () => {
    component.client = {id: 1, name: 'maria'};
    fixture.detectChanges();
    jest.spyOn(component.onDeleteClient, 'emit');
    const btnDelete = compiled.querySelector('[data-test=btn-delete]');
    console.log('=>' ,btnDelete?.textContent);
    btnDelete?.dispatchEvent(new Event('click'));
    expect(component.onDeleteClient.emit).toHaveBeenCalled();
  });


  test('Debe de emitir onClientUpdated con el boton de cambiar ID', () => {
    component.client = {id: 1, name: 'maria'};
    fixture.detectChanges();
    jest.spyOn(component.onClientUpdate, 'emit');
    const btnChangeId = compiled.querySelector('[data-test=btn-id]');
    btnChangeId?.dispatchEvent(new Event('click'));
    expect(component.onClientUpdate.emit).toHaveBeenCalledWith({
      id: 5,
      name: 'maria'
    });
  });


  test('Debe de emitir onChangeClient con el ID especificado Si hay client', () => {
    jest.spyOn(component.onClientUpdate, 'emit');
    component.onChange(10);
    expect(component.onClientUpdate.emit).not.toHaveBeenCalled();
    component.client = {id: 1, name: 'maria'};
    fixture.detectChanges();
    component.onChange(10);
    expect(component.onClientUpdate.emit).toHaveBeenCalled();
    expect(component.onClientUpdate.emit).toHaveBeenCalledWith({
      id: 10,
      name: 'maria'
    })
  });


});
