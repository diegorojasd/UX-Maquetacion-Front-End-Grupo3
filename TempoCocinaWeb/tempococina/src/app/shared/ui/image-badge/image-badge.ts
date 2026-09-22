import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

/**
 * Badge sobre imagen — overlays the cover photography.
 *
 * `technique` is the accent pill in the top-left ("Horno"). `telemetry`
 * is the dark glass pill in the bottom-right ("4 FASES TEMPORIZADAS"),
 * which the 35-component catalog does not name; treated as a variant of
 * this component and reported (docs/screens/W-06.md, discrepancy D7).
 */
export type ImageBadgeVariant = 'technique' | 'telemetry';

@Component({
  selector: 'tc-image-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <span class="tc-badge" [class]="'tc-badge--' + variant()">
      @if (icon(); as iconName) {
        <tc-icon [name]="iconName" [size]="14" />
      }
      <ng-content />
    </span>
  `,
  styles: `
    @use 'typography' as *;

    .tc-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--tc-space-8);
    }

    .tc-badge--technique {
      @include tc-text-caption-lg;

      padding: var(--tc-space-4) var(--tc-space-12);
      background: var(--tc-secondary);
      border-radius: var(--tc-radius-pill);
      color: var(--tc-on-secondary);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%);
    }

    .tc-badge--telemetry {
      @include tc-text-data;

      padding: var(--tc-space-4) var(--tc-space-12);
      background: color-mix(in srgb, var(--tc-scrim) 75%, transparent);
      border: 1px solid color-mix(in srgb, var(--tc-white) 20%, transparent);
      border-radius: var(--tc-radius-sm);
      color: var(--tc-white);
      backdrop-filter: blur(2px);
    }
  `,
})
export class ImageBadge {
  readonly variant = input.required<ImageBadgeVariant>();
  readonly icon = input<string>();
}
