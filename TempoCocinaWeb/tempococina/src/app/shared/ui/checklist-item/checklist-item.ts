import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

/**
 * Checklist item — one ingredient row. The only genuinely interactive
 * piece in the W-06 right column, so it carries the full state set:
 * default, hover, focus-visible and disabled (CLAUDE.md §8).
 *
 * A native `<input type="checkbox">` inside a `<label>` keeps the row
 * operable by keyboard and announced correctly. Toggling is visual only;
 * nothing is persisted, per the no-logic rule in CLAUDE.md §3.
 */
@Component({
  selector: 'tc-checklist-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <label class="tc-check" [class.tc-check--disabled]="disabled()">
      <span class="tc-check__control">
        <input class="tc-check__input" type="checkbox" [checked]="checked()" [disabled]="disabled()" />
        <tc-icon class="tc-check__tick" name="checkbox" [size]="16" aria-hidden="true" />
      </span>
      <span class="tc-check__name">{{ name() }}</span>
      <span class="tc-check__note">{{ note() }}</span>
    </label>
  `,
  styles: `
    @use 'mixins' as *;
    @use 'typography' as *;

    .tc-check {
      display: flex;
      align-items: center;
      gap: var(--tc-space-12);
      padding: var(--tc-space-13) var(--tc-space-13) var(--tc-space-13) var(--tc-space-12);
      background: color-mix(in srgb, var(--tc-surface-subtle) 90%, transparent);
      border: 1px solid color-mix(in srgb, var(--tc-border) 80%, transparent);
      border-radius: var(--tc-radius-button);
      cursor: pointer;
      transition: background-color 120ms ease, border-color 120ms ease;

      &:hover:not(.tc-check--disabled) {
        background: var(--tc-surface-alt);
        border-color: var(--tc-border);
      }

      &:has(.tc-check__input:focus-visible) {
        @include tc-focus-ring;
      }
    }

    .tc-check--disabled {
      cursor: not-allowed;
    }

    .tc-check__control {
      position: relative;
      display: inline-flex;
      flex-shrink: 0;
      width: 18px;
      height: 18px;
    }

    .tc-check__input {
      appearance: none;
      width: 100%;
      height: 100%;
      margin: 0;
      background: var(--tc-surface);
      border: 1px solid var(--tc-border);
      border-radius: var(--tc-radius-xs);
      cursor: inherit;

      &:checked {
        background: var(--tc-secondary);
        border-color: var(--tc-secondary);
      }

      &:disabled {
        background: var(--tc-surface-alt);
        border-color: var(--tc-border);
      }

      // The halo belongs to the row, which already draws it via :has().
      &:focus-visible {
        outline: none;
      }
    }

    .tc-check__tick {
      position: absolute;
      inset: 0;
      align-items: center;
      justify-content: center;
      color: var(--tc-on-secondary);
      opacity: 0;
      pointer-events: none;
    }

    .tc-check__input:checked + .tc-check__tick {
      opacity: 1;
    }

    .tc-check__input:disabled:checked + .tc-check__tick {
      color: var(--tc-text-disabled);
    }

    .tc-check__name {
      @include tc-text-unit;

      flex: 1;
      color: var(--tc-text-body);
    }

    .tc-check__note {
      @include tc-text-chip;

      flex-shrink: 0;
      padding: var(--tc-space-4) var(--tc-space-12);
      background: var(--tc-surface);
      border: 1px solid var(--tc-border);
      border-radius: var(--tc-radius-xs);
      color: var(--tc-text-secondary);
    }

    .tc-check--disabled .tc-check__name,
    .tc-check--disabled .tc-check__note {
      color: var(--tc-text-disabled);
    }
  `,
})
export class ChecklistItem {
  readonly name = input.required<string>();
  readonly note = input.required<string>();
  readonly checked = input(false);
  readonly disabled = input(false);
}
