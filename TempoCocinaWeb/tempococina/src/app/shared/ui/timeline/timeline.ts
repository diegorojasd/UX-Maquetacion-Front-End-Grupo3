import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TimelineMark, TimelineSegment } from '../../mocks/recipe.model';

/**
 * Timeline — how the sequence is spread over the session.
 *
 * This is a distribution, not a progress indicator, so it carries no
 * `role="progressbar"`: there is no single value moving towards a
 * maximum. The bands are an ordered list whose share is written out for
 * assistive technology, and the axis ticks are real text, so nothing is
 * conveyed by position or color alone (CLAUDE.md §8).
 *
 * Static by definition: the shares come from the mock and nothing
 * animates towards them (CLAUDE.md §3).
 */
@Component({
  selector: 'tc-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="tc-timeline__bar">
      @for (segment of segments(); track segment.stepId) {
        <li
          class="tc-timeline__segment"
          [class]="'tc-timeline__segment--' + segment.tone"
          [style.width.%]="segment.percent"
        >
          <span class="tc-timeline__share">{{ segment.label }}: {{ segment.percent }}%</span>
        </li>
      }
    </ol>

    <ul class="tc-timeline__axis">
      @for (mark of marks(); track mark.label) {
        <li class="tc-timeline__mark" [class.tc-timeline__mark--strong]="mark.emphasis">
          {{ mark.label }}
        </li>
      }
    </ul>
  `,
  styles: `
    @use 'typography' as *;

    :host {
      display: flex;
      flex-direction: column;
      gap: var(--tc-space-8);
    }

    .tc-timeline__bar {
      display: flex;
      margin: 0;
      padding: 3px;
      background: var(--tc-surface-alt);
      border: 1px solid var(--tc-border);
      border-radius: var(--tc-radius-pill);
      box-shadow: inset 0 2px 4px 1px rgb(0 0 0 / 5%);
      list-style: none;
      overflow: hidden;
    }

    .tc-timeline__segment {
      height: 8px;
      border-right: 1px solid color-mix(in srgb, var(--tc-white) 40%, transparent);

      &:first-child {
        border-start-start-radius: var(--tc-radius-pill);
        border-end-start-radius: var(--tc-radius-pill);
      }

      &:last-child {
        border-right: 0;
        border-start-end-radius: var(--tc-radius-pill);
        border-end-end-radius: var(--tc-radius-pill);
      }
    }

    .tc-timeline__segment--muted {
      background: var(--tc-text-secondary);
    }

    .tc-timeline__segment--deep {
      background: var(--tc-text-control);
    }

    .tc-timeline__segment--primary {
      background: var(--tc-primary);
    }

    .tc-timeline__segment--accent {
      background: var(--tc-secondary);
    }

    // Each band states its share in words; hidden visually because the
    // bar already shows it, but read out in order.
    .tc-timeline__share {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .tc-timeline__axis {
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .tc-timeline__mark {
      @include tc-text-axis;

      color: var(--tc-text-tertiary);
    }

    .tc-timeline__mark--strong {
      color: var(--tc-primary);
      font-weight: 700;
    }
  `,
})
export class Timeline {
  readonly segments = input.required<readonly TimelineSegment[]>();
  readonly marks = input.required<readonly TimelineMark[]>();
}
