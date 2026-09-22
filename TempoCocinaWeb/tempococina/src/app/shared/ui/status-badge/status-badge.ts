import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Status badge — a dot plus a written label. The dot never carries the
 * meaning on its own: the label always states the status in words
 * (CLAUDE.md §8). Presentational.
 *
 * Kept separate from `tc-equipment-chip` rather than extending it: both
 * are "dot + label" pills, but radius, dot size, palette and type style
 * all differ, and the catalog lists them as separate entries.
 */
export type StatusTone = 'success';

@Component({
  selector: 'tc-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="tc-status" [class]="'tc-status--' + tone()">
      <span class="tc-status__dot" aria-hidden="true"></span>
      <ng-content />
    </span>
  `,
  styles: `
    @use 'typography' as *;

    .tc-status {
      @include tc-text-caption;

      display: inline-flex;
      align-items: center;
      gap: var(--tc-space-8);
      padding: var(--tc-space-4) var(--tc-space-12);
      border: 1px solid transparent;
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
  `,
})
export class StatusBadge {
  readonly tone = input.required<StatusTone>();
}
