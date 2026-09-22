import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { StatusBadge } from '../status-badge/status-badge';
import { RecipeStep } from '../../mocks/recipe.model';

/**
 * Summary table — the consolidated alarm sequence before transfer.
 *
 * A real `<table>` with a `<caption>` and `<th scope="col">`, never divs
 * playing at being a table and never headers smuggled into the first
 * data row (CLAUDE.md §7). The caption is visually hidden because the
 * design shows the card's own heading instead.
 *
 * Row status and the critical-phase flag are written words, so neither
 * rests on color alone (CLAUDE.md §8).
 */
@Component({
  selector: 'tc-summary-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, StatusBadge],
  template: `
    <table class="tc-table">
      <caption class="tc-table__caption">{{ caption() }}</caption>
      <thead>
        <tr>
          <th class="tc-table__th" scope="col">Proceso / Identificador</th>
          <th class="tc-table__th tc-table__th--center" scope="col">Duración</th>
          <th class="tc-table__th" scope="col">Canal / Sonido</th>
          <th class="tc-table__th tc-table__th--end" scope="col">Estado</th>
        </tr>
      </thead>
      <tbody>
        @for (row of rows(); track row.id) {
          <tr class="tc-table__row">
            <td class="tc-table__cell">
              <p class="tc-table__title">{{ row.transferTitle }}</p>
              <p class="tc-table__subtitle">
                @if (row.criticalLabel; as flag) {
                  <span class="tc-table__critical">{{ flag }}</span>
                }
                <span>{{ row.transferSubtitle }}</span>
              </p>
            </td>
            <td class="tc-table__cell tc-table__cell--center">
              <span class="tc-table__duration">
                <span class="tc-table__duration-value">{{ row.transferDuration }}</span>
                <span class="tc-table__duration-unit">min</span>
              </span>
            </td>
            <td class="tc-table__cell">
              <p class="tc-table__channel">{{ row.channel }}</p>
              <p class="tc-table__sound">
                <tc-icon [name]="row.soundIcon" [size]="14" />
                {{ row.sound }}
              </p>
            </td>
            <td class="tc-table__cell tc-table__cell--end">
              <tc-status-badge tone="neutral">{{ row.transferStatus }}</tc-status-badge>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: `
    @use 'typography' as *;

    .tc-table {
      width: 100%;
      border-collapse: collapse;
    }

    // Visually hidden, still announced.
    .tc-table__caption {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .tc-table__th {
      @include tc-text-caption;

      padding: var(--tc-space-12) var(--tc-space-24);
      background: color-mix(in srgb, var(--tc-surface-subtle) 75%, transparent);
      border-bottom: 1px solid color-mix(in srgb, var(--tc-border) 80%, transparent);
      color: var(--tc-text-secondary);
      font-weight: 700;
      text-align: left;
    }

    .tc-table__th--center {
      text-align: center;
    }

    .tc-table__th--end {
      text-align: right;
    }

    .tc-table__row + .tc-table__row .tc-table__cell {
      border-top: 1px solid var(--tc-surface-alt);
    }

    .tc-table__cell {
      padding: var(--tc-space-16) var(--tc-space-24);
      vertical-align: middle;
    }

    .tc-table__cell--center {
      text-align: center;
    }

    .tc-table__cell--end {
      text-align: right;
    }

    .tc-table__title {
      @include tc-text-row-title;

      margin: 0;
      color: var(--tc-text-strong);
    }

    .tc-table__subtitle {
      @include tc-text-chip;

      display: flex;
      align-items: center;
      gap: var(--tc-space-8);
      margin: var(--tc-space-4) 0 0;
      color: var(--tc-text-secondary);
    }

    .tc-table__critical {
      @include tc-text-chip-bold;

      display: flex;
      align-items: center;
      gap: var(--tc-space-8);
      color: var(--tc-secondary);
    }

    // The separator between the flag and the phase is decoration, so it
    // is drawn in CSS rather than typed into the copy.
    .tc-table__critical::after {
      content: '•';
      color: var(--tc-text-disabled);
    }

    .tc-table__duration {
      @include tc-text-chip;

      display: inline-flex;
      align-items: baseline;
      gap: var(--tc-space-4);
      padding: var(--tc-space-4) var(--tc-space-12);
      background: var(--tc-surface-alt);
      border: 1px solid var(--tc-border);
      border-radius: var(--tc-radius-sm);
      color: var(--tc-text-secondary);
    }

    .tc-table__duration-value {
      @include tc-text-subhead;

      color: var(--tc-text-strong);
      font-variant-numeric: tabular-nums;
    }

    .tc-table__channel {
      @include tc-text-unit;

      margin: 0;
      color: var(--tc-text-body);
      font-weight: 500;
    }

    .tc-table__sound {
      @include tc-text-body-s;

      display: flex;
      align-items: center;
      gap: var(--tc-space-8);
      margin: var(--tc-space-4) 0 0;
      color: var(--tc-text-secondary);

      tc-icon {
        color: var(--tc-secondary);
      }
    }
  `,
})
export class SummaryTable {
  readonly rows = input.required<readonly RecipeStep[]>();
  readonly caption = input.required<string>();
}
