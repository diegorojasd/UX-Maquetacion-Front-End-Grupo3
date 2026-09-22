import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { RecipeStepMeta } from '../../mocks/recipe.model';

/**
 * Step item — one timed stage of the sequence, with its ordinal badge,
 * instruction, metadata row and timer badge. Presentational; the mockup
 * gives it no interactive state.
 *
 * The ordinal and the duration both count, so they use tabular figures
 * (CLAUDE.md §8).
 */
@Component({
  selector: 'tc-step-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <article class="tc-step">
      <p class="tc-step__order" aria-hidden="true">{{ order() }}</p>
      <div class="tc-step__body">
        <h3 class="tc-step__title">{{ title() }}</h3>
        <p class="tc-step__description">{{ description() }}</p>
        <ul class="tc-step__meta">
          @for (item of meta(); track item.label) {
            <li class="tc-step__meta-item" [class]="'tc-step__meta-item--' + item.tone">
              @if (item.icon; as metaIcon) {
                <tc-icon [name]="metaIcon" [size]="12" />
              }
              <span class="tc-step__meta-label">{{ item.label }}</span>
              @if (item.value; as metaValue) {
                <span class="tc-step__meta-value">{{ metaValue }}</span>
              }
            </li>
          }
        </ul>
      </div>
      <p class="tc-step__timer">
        <tc-icon name="clock" [size]="14" />
        <span>{{ duration() }}</span>
      </p>
    </article>
  `,
  styles: `
    @use 'typography' as *;

    .tc-step {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: start;
      gap: var(--tc-space-14);
      padding: var(--tc-space-17);
      background: var(--tc-surface);
      border: 1px solid color-mix(in srgb, var(--tc-border) 90%, transparent);
      border-radius: var(--tc-radius-button);
    }

    .tc-step__order {
      @include tc-text-badge-num;

      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      margin: 0;
      background: var(--tc-text-strong);
      border-radius: var(--tc-radius-chip);
      color: var(--tc-on-primary);
    }

    .tc-step__body {
      display: flex;
      flex-direction: column;
      gap: var(--tc-space-4);
      min-width: 0;
    }

    .tc-step__title {
      @include tc-text-h3;

      margin: 0;
      color: var(--tc-text-strong);
    }

    .tc-step__description {
      @include tc-text-body-s-loose;

      margin: 0;
      color: var(--tc-text-muted);
    }

    .tc-step__meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--tc-space-16);
      margin: var(--tc-space-4) 0 0;
      padding: 0;
      list-style: none;
    }

    .tc-step__meta-item {
      @include tc-text-meta;

      display: flex;
      align-items: center;
      gap: var(--tc-space-4);
      color: var(--tc-text-secondary);
    }

    // The bullet between metadata items is decorative, so it is drawn in
    // CSS rather than typed into the copy.
    .tc-step__meta-item + .tc-step__meta-item::before {
      content: '•';
      margin-right: var(--tc-space-12);
      color: var(--tc-text-disabled);
    }

    .tc-step__meta-value {
      color: var(--tc-text-body);
    }

    .tc-step__meta-item--success {
      color: var(--tc-success-text);
      font-weight: 500;
    }

    .tc-step__meta-item--critical {
      color: var(--tc-secondary);
      font-weight: 500;
    }

    .tc-step__timer {
      @include tc-text-badge-num;

      display: flex;
      align-items: center;
      gap: var(--tc-space-8);
      margin: 0;
      padding: var(--tc-space-4) var(--tc-space-12);
      background: var(--tc-surface-alt);
      border: 1px solid var(--tc-border);
      border-radius: var(--tc-radius-chip);
      color: var(--tc-text-strong);
      white-space: nowrap;

      tc-icon {
        color: var(--tc-secondary);
      }
    }
  `,
})
export class StepItem {
  readonly order = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly duration = input.required<string>();
  readonly meta = input.required<readonly RecipeStepMeta[]>();
}
