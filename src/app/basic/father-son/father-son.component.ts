import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../interfaces/client';

@Component({
  selector: 'app-father-son',
  templateUrl: './father-son.component.html',
  styleUrls: ['./father-son.component.scss']
})
export class FatherSonComponent {
  @Input() client?: Client;
  @Output() onDeleteClient = new EventEmitter();
  @Output() onClientUpdate = new EventEmitter<Client>();

  onDelete(): void {
    this.client = undefined;
    this.onDeleteClient.emit();
  }

  onChange(id: number): void {
    if(!this.client) return;
    //this.client.id = newId;
    this.client = { ...this.client, id }
    this.onClientUpdate.emit({...this.client});
  }
}
