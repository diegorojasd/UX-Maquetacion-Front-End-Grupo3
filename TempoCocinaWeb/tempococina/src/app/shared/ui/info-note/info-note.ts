import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../icon/icon';

/** Nota informativa — a bordered aside with an info mark. Presentational. */
@Component({
  selector: 'tc-info-note',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div class="tc-note">
      <tc-icon class="tc-note__icon" name="info" [size]="16" />
      <p class="tc-note__text"><ng-content /></p>
    </div>
  `,
  styles: `
    @use 'typography' as *;

    .tc-note {
      display: flex;
      align-items: flex-start;
      gap: var(--tc-space-8);
      padding: var(--tc-space-12);
      background: color-mix(in srgb, var(--tc-surface) 60%, transparent);
      border: 1px solid color-mix(in srgb, var(--tc-border) 60%, transparent);
      border-radius: var(--tc-radius-chip);
    }

    .tc-note__icon {
      margin-top: 2px;
      color: var(--tc-primary);
    }

    .tc-note__text {
      @include tc-text-body-s-loose;

      margin: 0;
      color: var(--tc-text-secondary);
    }
  `,
})
export class InfoNote {}
