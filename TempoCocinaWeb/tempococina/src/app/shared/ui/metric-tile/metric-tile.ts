import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { MetricTone } from '../../mocks/recipe.model';

/**
 * Metric tile — one figure from the recipe header grid. Presentational:
 * the mockup gives it no interactive state, so none is invented here.
 * The icon tint is categorical and always paired with its written label,
 * so color is never the sole carrier of meaning (CLAUDE.md §8).
 */
@Component({
  selector: 'tc-metric-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div class="tc-metric">
      <p class="tc-metric__label">
        <tc-icon class="tc-metric__icon" [class]="'tc-metric__icon--' + tone()" [name]="icon()" [size]="14" />
        {{ label() }}
      </p>
      <p class="tc-metric__value-row">
        <span class="tc-metric__value" [class.tc-metric__value--accent]="emphasizeValue()" [class.tc-metric__value--text]="!unit()">
          {{ value() }}
        </span>
        @if (unit(); as unitLabel) {
          <span class="tc-metric__unit">{{ unitLabel }}</span>
        }
      </p>
    </div>
  `,
  styles: `
    @use 'typography' as *;

    .tc-metric {
      display: flex;
      flex-direction: column;
      gap: var(--tc-space-4);
      padding: var(--tc-space-12);
      background: var(--tc-surface-subtle);
      border: 1px solid color-mix(in srgb, var(--tc-border) 80%, transparent);
      border-radius: var(--tc-radius-button);
    }

    .tc-metric__label {
      @include tc-text-caption;

      display: flex;
      align-items: center;
      gap: var(--tc-space-8);
      margin: 0;
      color: var(--tc-text-tertiary);
    }

    .tc-metric__icon--neutral {
      color: var(--tc-text-tertiary);
    }

    .tc-metric__icon--accent {
      color: var(--tc-secondary);
    }

    .tc-metric__icon--warning {
      color: var(--tc-warning);
    }

    .tc-metric__icon--servings {
      color: var(--tc-accent-servings);
    }

    .tc-metric__value-row {
      display: flex;
      align-items: baseline;
      gap: var(--tc-space-8);
      margin: 0;
    }

    .tc-metric__value {
      @include tc-text-metric-value;

      color: var(--tc-text-strong);
    }

    .tc-metric__value--accent {
      color: var(--tc-secondary);
    }

    .tc-metric__value--text {
      @include tc-text-subhead;

      color: var(--tc-text-body);
    }

    .tc-metric__unit {
      @include tc-text-unit;

      color: var(--tc-text-secondary);
    }
  `,
})
export class MetricTile {
  readonly icon = input.required<string>();
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly unit = input<string>();
  readonly tone = input.required<MetricTone>();
  readonly emphasizeValue = input(false);
}
