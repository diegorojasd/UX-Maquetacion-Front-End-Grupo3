import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';

/**
 * The "Volver" trace above a screen's content, with the rule that
 * separates it from the page. Shared so W-06 and W-22 cannot drift
 * apart — they did while each feature carried its own copy.
 *
 * The frames draw the link 14px tall, well under the 44px minimum
 * target CLAUDE.md §8 requires. The target is widened with a
 * pseudo-element instead of padding, so the control is comfortably
 * clickable without pushing the label or the rule out of position.
 */
@Component({
  selector: 'tc-back-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RouterLink],
  template: `
    <nav class="tc-back" [attr.aria-label]="navLabel()">
      <a class="tc-back__link" [routerLink]="target()">
        <tc-icon name="arrow-left" [size]="11" />
        <span>{{ label() }}</span>
      </a>
    </nav>
  `,
  styles: `
    @use 'mixins' as *;
    @use 'typography' as *;

    .tc-back {
      padding-bottom: var(--tc-space-25);
      border-bottom: 1px solid var(--tc-border);
    }

    .tc-back__link {
      @include tc-text-nav-label;

      position: relative;
      display: inline-flex;
      align-items: center;
      gap: var(--tc-space-8);
      color: var(--tc-text-nav);
      text-decoration: none;

      // Hit area only — it adds no height to the layout.
      &::after {
        content: '';
        position: absolute;
        inset: -15px -8px;
      }

      &:hover {
        color: var(--tc-text-body);
      }

      &:focus-visible {
        @include tc-focus-ring;

        border-radius: var(--tc-radius-xs);
      }
    }
  `,
})
export class BackLink {
  readonly label = input.required<string>();
  readonly target = input.required<string>();
  readonly navLabel = input.required<string>();
}
