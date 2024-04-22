import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './main-input.component.html',
  styleUrl: './main-input.component.css'
})
export class MainInputComponent{
  @Input() label?: string;
  @Input() placeholder?: string | null;

  @Input() value!: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

  focus(element: HTMLElement){
    if(document.activeElement !== element){
      element.focus()
    }
  }
}
