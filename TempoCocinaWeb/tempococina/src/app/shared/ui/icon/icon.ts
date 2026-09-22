import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Renders one symbol from `assets/icons/sprite.svg` (CLAUDE.md §6).
 * Always decorative — an icon-only control supplies its own
 * `aria-label` on the enclosing `<button>`/`<a>`, never on the icon.
 */
@Component({
  selector: 'tc-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'tc-icon-host',
  },
  template: `
    <svg
      class="tc-icon"
      [style.width.px]="size()"
      [style.height.px]="size()"
      aria-hidden="true"
      focusable="false"
    >
      <use [attr.href]="'assets/icons/sprite.svg#tc-icon-' + name()" />
    </svg>
  `,
  styles: `
    .tc-icon-host {
      display: inline-flex;
      flex-shrink: 0;
    }

    .tc-icon {
      display: block;
    }
  `,
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(16);
}
