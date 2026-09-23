import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MockupEntry {
  readonly id: string;
  readonly title: string;
  readonly module: string;
  readonly path: string;
}

/**
 * Review index for the implemented mockups (CLAUDE.md §9). Entries are
 * added as each screen lands; W-24, W-22 and W-13 follow W-06.
 */
@Component({
  selector: 'tc-mockups-index',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <main class="tc-index">
      <h1 class="tc-index__title">Mockups web implementados</h1>
      <ul class="tc-index__list">
        @for (entry of entries; track entry.id) {
          <li>
            <a class="tc-index__item" [routerLink]="entry.path">
              <span class="tc-index__id">{{ entry.id }}</span>
              <span class="tc-index__name">{{ entry.title }}</span>
              <span class="tc-index__module">{{ entry.module }}</span>
            </a>
          </li>
        }
      </ul>
    </main>
  `,
  styles: `
    @use 'mixins' as *;
    @use 'typography' as *;

    .tc-index {
      display: flex;
      flex-direction: column;
      @include tc-page-container;

      gap: var(--tc-space-24);
      padding-block: var(--tc-page-block);
    }

    .tc-index__title {
      @include tc-text-h1;

      margin: 0;
      color: var(--tc-text-primary);
    }

    .tc-index__list {
      display: flex;
      flex-direction: column;
      gap: var(--tc-space-12);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .tc-index__item {
      @include tc-card-surface;

      display: flex;
      align-items: center;
      gap: var(--tc-space-16);
      padding: var(--tc-space-16);
      text-decoration: none;

      &:hover {
        background: var(--tc-surface-subtle);
      }

      &:focus-visible {
        @include tc-focus-ring;
      }
    }

    .tc-index__id {
      @include tc-text-badge-num;

      padding: var(--tc-space-4) var(--tc-space-8);
      background: var(--tc-primary);
      border-radius: var(--tc-radius-sm);
      color: var(--tc-on-primary);
    }

    .tc-index__name {
      @include tc-text-h3;

      flex: 1;
      color: var(--tc-text-strong);
    }

    .tc-index__module {
      @include tc-text-chip;

      color: var(--tc-text-secondary);
    }
  `,
})
export default class MockupsIndex {
  protected readonly entries: readonly MockupEntry[] = [
    {
      id: 'W-02',
      title: ' Lista de recetas comunes',
      module: 'Recetario',
      path: '/mockups/w-02',
    },
    {
      id: 'W-06',
      title: 'Detalle de receta y flujo de pasos',
      module: 'Recetario',
      path: '/mockups/w-06',
    },
    {
      id: 'W-13',
      title: 'Configuración automática sugerida',
      module: 'Detección automática',
      path: '/mockups/w-13',
    },
    {
      id: 'W-17',
      title: 'Sonido Sugerido',
      module: 'Sonido',
      path: '/mockups/w-17',
    },
    {
      id: 'W-22',
      title: 'Confirmar y enviar al móvil',
      module: 'Transferencia',
      path: '/mockups/w-22',
    },
    {
      id: 'W-24',
      title: 'Alarmas sincronizadas',
      module: 'Transferencia',
      path: '/mockups/w-24',
    },
  ];
}
