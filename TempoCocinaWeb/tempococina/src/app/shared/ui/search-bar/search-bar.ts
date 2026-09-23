import { Component, Input } from '@angular/core';
import { Icon } from '../icon/icon';
import { Select } from '../select/select';

@Component({
  selector: 'tc-search-bar',
  standalone: true,
  imports: [Icon, Select],
  template: `
    <style>
      .tc-search-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #f9fafb; /* gris contenedor */
        border-radius: 12px;
        padding: 12px 16px;
        box-shadow: 0 0 0 1px #e5e7eb;
      }

      .tc-search-bar__input-group {
        display: flex;
        align-items: center;
        flex: 1;
        background: #fff; /* campo blanco */
        border-radius: 8px;
        padding: 8px 12px;
        box-shadow: 0 0 0 1px #e5e7eb;
      }

      .tc-search-bar__icon {
        color: #9ca3af;
        margin-right: 8px;
      }

      .tc-search-bar__input {
        flex: 1;
        border: none;
        outline: none;
        font: 14px 'Segoe UI', sans-serif;
        background: transparent;
        color: #111827;
      }

      .tc-search-bar__select-group {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    </style>

    <div class="tc-search-bar">
      <div class="tc-search-bar__input-group">
        <tc-icon class="tc-search-bar__icon" name="search"></tc-icon>
        <input
          type="text"
          class="tc-search-bar__input"
          [placeholder]="placeholder"
        />
      </div>

      <div class="tc-search-bar__select-group">
        <tc-select label="Todos los tiempos"></tc-select>
        <tc-select label="Dificultad"></tc-select>
        <tc-select label="Tipo de cocción"></tc-select>
      </div>
    </div>
  `
})
export class SearchBar {
  @Input() placeholder: string = 'Buscar receta por nombre o ingrediente...';
}
