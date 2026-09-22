import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

/**
 * Sound list item — one transferred process: its ordinal, condensed
 * label, duration and assigned alarm tone. Presentational; the mockup
 * gives the row no interactive state.
 *
 * Ordinal and duration both count, so they are set in the monospaced
 * Data style with tabular figures (CLAUDE.md §8).
 */
@Component({
  selector: 'tc-sound-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div class="tc-sound">
      <span class="tc-sound__order" aria-hidden="true">{{ order() }}</span>
      <span class="tc-sound__label">{{ label() }}</span>
      <span class="tc-sound__duration">{{ duration() }}</span>
      <span class="tc-sound__tone">
        <tc-icon name="volume" [size]="14" />
        {{ tone() }}
      </span>
    </div>
  `,
  styles: `
    @use 'typography' as *;

    .tc-sound {
      display: flex;
      align-items: center;
      gap: var(--tc-space-12);
      padding: var(--tc-space-13) var(--tc-space-17);
      background: var(--tc-surface);
      border: 1px solid color-mix(in srgb, var(--tc-border) 90%, transparent);
      border-radius: var(--tc-radius-button);
      box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
    }

    .tc-sound__order {
      @include tc-text-data-num;

      padding: var(--tc-space-4) var(--tc-space-8);
      background: var(--tc-surface-alt);
      border-radius: var(--tc-radius-xs);
      color: var(--tc-text-tertiary);
    }

    .tc-sound__label {
      @include tc-text-unit;

      flex: 1;
      color: var(--tc-text-body);
    }

    .tc-sound__duration {
      @include tc-text-data-num;

      padding: var(--tc-space-4) var(--tc-space-12);
      background: var(--tc-surface-alt);
      border: 1px solid var(--tc-border);
      border-radius: var(--tc-radius-xs);
      color: var(--tc-text-body);
      white-space: nowrap;
    }

    .tc-sound__tone {
      @include tc-text-body-s;

      display: flex;
      align-items: center;
      gap: var(--tc-space-4);
      // Holds the column steady when a tone name wraps to two lines.
      width: 112px;
      color: var(--tc-text-secondary);

      tc-icon {
        color: var(--tc-primary);
      }
    }
  `,
})
export class SoundListItem {
  readonly order = input.required<string>();
  readonly label = input.required<string>();
  readonly duration = input.required<string>();
  readonly tone = input.required<string>();
}
