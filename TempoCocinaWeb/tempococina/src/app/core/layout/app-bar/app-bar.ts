import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../../shared/ui/icon/icon';

/**
 * App bar — brand on the left (CLAUDE.md §2). The mockups present every
 * screen inside a simulated browser window (traffic lights + URL bar);
 * that chrome is not part of the app and is not reproduced here, only
 * the brand mark it contains.
 *
 * The wordmark uses Montserrat ExtraBold/Bold at fixed sizes taken
 * directly from the Figma brand lockup — an intentional exception to the
 * single-family Roboto type ramp in CLAUDE.md §5, since this is a
 * logotype, not body copy. Recorded as an assumption in the Paso 2 report.
 */
@Component({
  selector: 'tc-app-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <header class="tc-appbar">
      <div class="tc-appbar__brand">
        <tc-icon name="timer-brand" [size]="32" />
        <span class="tc-appbar__wordmark">
          <span class="tc-appbar__wordmark-line tc-appbar__wordmark-line--tempo">Tempo</span>
          <span class="tc-appbar__wordmark-line tc-appbar__wordmark-line--cocina">Cocina</span>
        </span>
      </div>
    </header>
  `,
  styles: `
    @use 'typography' as *;

    .tc-appbar {
      display: flex;
      align-items: center;
      height: 53px;
      padding-inline: var(--tc-space-32);
      background: var(--tc-surface);
      border-bottom: 1px solid var(--tc-border);
    }

    .tc-appbar__brand {
      display: flex;
      align-items: center;
      gap: var(--tc-space-12);
    }

    .tc-appbar__wordmark {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }

    .tc-appbar__wordmark-line--tempo {
      @include tc-text-wordmark-primary;

      color: var(--tc-primary);
    }

    .tc-appbar__wordmark-line--cocina {
      @include tc-text-wordmark-secondary;

      margin-top: var(--tc-space-4);
      color: var(--tc-secondary);
    }
  `,
})
export class AppBar {}
