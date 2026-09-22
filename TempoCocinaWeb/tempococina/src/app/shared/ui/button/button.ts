import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

/**
 * The catalog in CLAUDE.md §9 names eight button variants. Only the three
 * W-06 uses are implemented; the union grows as W-24, W-22 and W-13 land,
 * rather than shipping unstyled variants nothing renders yet.
 *
 * - `brand-block` — full-width ficha action, deep teal, gear icon.
 * - `primary`     — critical CTA, orange, uppercase label.
 * - `secondary`   — outline on surface, same height as primary.
 */
export type ButtonVariant = 'brand-block' | 'primary' | 'secondary';

@Component({
  selector: 'tc-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <button class="tc-button" [class]="'tc-button--' + variant()" [disabled]="disabled()" type="button">
      @if (icon(); as iconName) {
        <tc-icon [name]="iconName" [size]="16" />
      }
      <span class="tc-button__label"><ng-content /></span>
    </button>
  `,
  styles: `
    @use 'mixins' as *;
    @use 'typography' as *;

    :host {
      display: contents;
    }

    .tc-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--tc-space-8);
      border: 1px solid transparent;
      border-radius: var(--tc-radius-button);
      cursor: pointer;
      // CLAUDE.md §8 — every control keeps a 44px minimum target even
      // where the mockup draws a shorter box.
      min-height: 44px;
      transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;

      &:focus-visible {
        @include tc-focus-ring;
      }

      &:disabled {
        cursor: not-allowed;
        // Shape is preserved; only ink drops (CLAUDE.md §8).
        color: var(--tc-text-disabled);
      }
    }

    .tc-button--brand-block {
      @include tc-text-button;

      width: 100%;
      gap: var(--tc-space-12);
      padding: var(--tc-space-12) var(--tc-space-16);
      background: var(--tc-primary);
      color: var(--tc-on-primary);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%);

      tc-icon {
        color: var(--tc-secondary);
      }

      &:hover:not(:disabled) {
        background: var(--tc-primary-deep);
      }

      &:disabled {
        background: var(--tc-surface-alt);
        box-shadow: none;

        tc-icon {
          color: var(--tc-text-disabled);
        }
      }
    }

    .tc-button--primary {
      @include tc-text-button-s-caps;

      padding: var(--tc-space-8) var(--tc-space-16);
      background: var(--tc-secondary);
      color: var(--tc-on-secondary);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%);

      &:hover:not(:disabled) {
        background: color-mix(in srgb, var(--tc-secondary) 88%, black);
      }

      &:disabled {
        background: var(--tc-surface-alt);
        box-shadow: none;
      }
    }

    .tc-button--secondary {
      @include tc-text-button-s;

      padding: var(--tc-space-8) var(--tc-space-16);
      background: var(--tc-surface);
      border-color: var(--tc-text-disabled);
      color: var(--tc-text-control);

      &:hover:not(:disabled) {
        background: var(--tc-surface-alt);
      }

      &:disabled {
        background: var(--tc-surface);
      }
    }
  `,
})
export class Button {
  readonly variant = input.required<ButtonVariant>();
  readonly icon = input<string>();
  readonly disabled = input(false);
}
