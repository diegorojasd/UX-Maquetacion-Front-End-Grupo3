import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Status badge — a written status, optionally preceded by a dot. The
 * dot never carries the meaning on its own: the label always states the
 * status in words (CLAUDE.md §8). Presentational.
 *
 * Kept separate from `tc-equipment-chip`: both are capsules, but their
 * palette, radius and type style differ, and the catalog lists them as
 * separate entries.
 */
export type StatusTone = 'success' | 'neutral';

/** `pill` is fully rounded; `chip` uses the small badge radius. */
export type StatusShape = 'pill' | 'chip';

@Component({
  selector: 'tc-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="tc-status" [class]="'tc-status--' + tone() + ' tc-status--' + shape()">
      @if (dot()) {
        <span class="tc-status__dot" aria-hidden="true"></span>
      }
      <ng-content />
    </span>
  `,
  styles: `
    @use 'typography' as *;

    .tc-status {
      display: inline-flex;
      align-items: center;
      gap: var(--tc-space-8);
      padding: var(--tc-space-4) var(--tc-space-12);
      border: 1px solid transparent;
    }

    .tc-status--pill {
      @include tc-text-chip-bold;

      border-radius: var(--tc-radius-pill);
    }

    .tc-status--chip {
      @include tc-text-caption;

      border-radius: var(--tc-radius-sm);
      font-weight: 700;
    }

    .tc-status__dot {
      width: 8px;
      height: 8px;
      border-radius: var(--tc-radius-pill);
      background: currentcolor;
    }

    .tc-status--success {
      background: color-mix(in srgb, var(--tc-success-bg) 70%, transparent);
      border-color: var(--tc-success-border);
      color: var(--tc-success-ink);
    }

    .tc-status--success .tc-status__dot {
      background: var(--tc-success);
    }

    .tc-status--neutral {
      background: var(--tc-surface);
      border-color: var(--tc-text-disabled);
      color: var(--tc-text-control);
    }

    // The sequence flag sits on the card header, so it takes the tinted
    // fill the design gives it there rather than the plain surface.
    .tc-status--neutral.tc-status--chip {
      background: var(--tc-surface-alt);
    }
  `,
})
export class StatusBadge {
  readonly tone = input.required<StatusTone>();
  readonly shape = input<StatusShape>('pill');
  readonly dot = input(false);
}
