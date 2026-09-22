import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';

/**
 * The catalog in CLAUDE.md §9 names eight button variants. Only the three
 * W-06 uses are implemented; the union grows as W-24, W-22 and W-13 land,
 * rather than shipping unstyled variants nothing renders yet.
 *
 * - `brand`       — deep teal, auto width, leading icon.
 * - `brand-block` — the same skin at full width (ficha action).
 * - `primary`     — critical CTA, orange, uppercase label.
 * - `secondary`   — outline on surface, same height as primary.
 * - `dashed`      — dashed outline, adds an item to an editable list.
 */
export type ButtonVariant = 'brand' | 'brand-block' | 'primary' | 'secondary' | 'dashed';

/**
 * `secondary` is drawn at two scales across the mockups: compact in the
 * W-06 control bar, and larger beside the W-22 send action
 * (docs/screens/W-22.md, F12). Size is an input rather than two
 * variants, and each screen passes what its frame shows.
 */
export type ButtonSize = 'sm' | 'md';

@Component({
  selector: 'tc-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, NgTemplateOutlet, RouterLink],
  template: `
    @if (link(); as target) {
      <a class="tc-button" [class]="classes()" [routerLink]="target">
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else {
      <button class="tc-button" [class]="classes()" [disabled]="disabled()" type="button">
        <ng-container [ngTemplateOutlet]="content" />
      </button>
    }

    <ng-template #content>
      @if (icon(); as iconName) {
        <tc-icon [name]="iconName" [size]="16" />
      }
      <span class="tc-button__label"><ng-content /></span>
    </ng-template>
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
      text-decoration: none;
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

    .tc-button--brand,
    .tc-button--brand-block {
      @include tc-text-button;

      gap: var(--tc-space-12);
      padding: var(--tc-space-12) var(--tc-space-24);
      background: var(--tc-primary);
      color: var(--tc-on-primary);
      text-decoration: none;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%);

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

    .tc-button--brand-block {
      width: 100%;
      padding-inline: var(--tc-space-16);
    }

    // The frames tint the leading icon on some brand buttons and not
    // others, so it is opted into rather than tied to the variant.
    .tc-button--brand-block tc-icon,
    .tc-button--accent-icon tc-icon {
      color: var(--tc-secondary);
    }

    .tc-button--brand-block:disabled tc-icon,
    .tc-button--accent-icon:disabled tc-icon {
      color: var(--tc-text-disabled);
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
      background: var(--tc-surface);
      border-color: var(--tc-text-disabled);
      text-decoration: none;

      &:hover:not(:disabled) {
        background: var(--tc-surface-alt);
      }

      &:disabled {
        background: var(--tc-surface);
      }
    }

    .tc-button--secondary.tc-button--sm {
      @include tc-text-button-s;

      padding: var(--tc-space-8) var(--tc-space-16);
      color: var(--tc-text-control);
    }

    .tc-button--secondary.tc-button--md {
      @include tc-text-button;

      padding: var(--tc-space-12) var(--tc-space-24);
      color: var(--tc-primary);
    }

    .tc-button--dashed {
      @include tc-text-button;

      gap: var(--tc-space-12);
      padding: var(--tc-space-10) var(--tc-space-17);
      background: var(--tc-primary);
      border: 1px dashed color-mix(in srgb, var(--tc-on-primary) 45%, transparent);
      color: var(--tc-on-primary);

      &:hover:not(:disabled) {
        background: var(--tc-primary-deep);
        border-color: var(--tc-on-primary);
      }

      &:disabled {
        background: var(--tc-surface-alt);
        border-color: var(--tc-text-disabled);
      }
    }

    .tc-button--block {
      width: 100%;
    }
  `,
})
export class Button {
  readonly variant = input.required<ButtonVariant>();
  readonly size = input<ButtonSize>('sm');
  /** Stretches the control to its container's width. */
  readonly block = input(false);
  /**
   * Tints the leading icon with the accent, the way the ficha action
   * does. The frames apply it per button, not per variant: W-13's send
   * carries an orange bolt while W-24's back arrow stays white.
   */
  readonly accentIcon = input(false);
  readonly icon = input<string>();
  readonly disabled = input(false);
  /** Renders an `<a routerLink>` instead of a `<button>` (CLAUDE.md §8). */
  readonly link = input<string>();

  protected readonly classes = computed(() => {
    const names = [`tc-button--${this.variant()}`, `tc-button--${this.size()}`];
    if (this.block()) {
      names.push('tc-button--block');
    }
    if (this.accentIcon()) {
      names.push('tc-button--accent-icon');
    }
    return names.join(' ');
  });
}
