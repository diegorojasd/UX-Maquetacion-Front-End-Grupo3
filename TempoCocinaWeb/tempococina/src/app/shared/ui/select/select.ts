import { Component, Input } from '@angular/core';

@Component({
  selector: 'tc-select',
  standalone: true,
  template: `
    <style>
      .tc-select {
        display: inline-flex;
        align-items: center;
        background: #fff;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 6px 10px;
        font: 14px 'Segoe UI', sans-serif;
        color: #111827;
        cursor: pointer;
      }
      .tc-select:focus {
        outline: 2px solid #2563eb;
      }
    </style>

    <select class="tc-select">
      <option>{{ label }}</option>
    </select>
  `
})
export class Select {
  @Input() label: string = '';
}
