import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EquipmentTone } from '../../mocks/recipe.model';

/**
 * Chip de equipamiento — a required piece of kit. Presentational; the
 * mockup shows no interaction, so no hover/focus state is invented.
 *
 * Accessibility finding carried from docs/screens/W-06.md: the dot's
 * three colors have no legend in the design. If they encode a state,
 * color is their only carrier, which CLAUDE.md §8 forbids. Built as
 * designed and reported rather than silently given a label.
 */
@Component({
  selector: 'tc-equipment-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="tc-chip" [class]="'tc-chip--' + tone()">
      <span class="tc-chip__dot" aria-hidden="true"></span>
      <ng-content />
    </span>
  `,
  styles: `
    @use 'typography' as *;

    .tc-chip {
      @include tc-text-chip-strong;

      display: inline-flex;
      align-items: center;
      gap: var(--tc-space-8);
      padding: var(--tc-space-8) var(--tc-space-12);
      background: var(--tc-surface-alt);
      border: 1px solid var(--tc-border);
      border-radius: var(--tc-radius-chip);
      color: var(--tc-text-control);
    }

    .tc-chip__dot {
      width: 6px;
      height: 6px;
      border-radius: var(--tc-radius-pill);
      background: currentcolor;
    }

    .tc-chip--accent .tc-chip__dot {
      background: var(--tc-secondary);
    }

    .tc-chip--primary .tc-chip__dot {
      background: var(--tc-primary);
    }

    .tc-chip--muted {
      @include tc-text-chip;

      background: var(--tc-surface-subtle);
      border-color: color-mix(in srgb, var(--tc-border) 70%, transparent);
      color: var(--tc-text-secondary);
    }

    .tc-chip--muted .tc-chip__dot {
      background: var(--tc-text-tertiary);
    }
  `,
})
export class EquipmentChip {
  readonly tone = input.required<EquipmentTone>();
}
