import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { StatusBadge } from '../status-badge/status-badge';

/**
 * Sync card — groups the paired device, its transferred sequence and
 * the closing note. The list and the note are projected so the screen
 * decides what goes inside. Presentational.
 */
@Component({
  selector: 'tc-sync-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, StatusBadge],
  template: `
    <div class="tc-sync">
      <div class="tc-sync__header">
        <p class="tc-sync__device">
          <span class="tc-sync__device-icon">
            <tc-icon [name]="deviceIcon()" [size]="20" />
          </span>
          {{ deviceName() }}
        </p>
        <tc-status-badge tone="success" shape="chip" [dot]="true">{{ deviceStatus() }}</tc-status-badge>
      </div>
      <ng-content />
    </div>
  `,
  styles: `
    @use 'typography' as *;

    .tc-sync {
      display: flex;
      flex-direction: column;
      gap: var(--tc-space-16);
      padding: var(--tc-space-25);
      background: var(--tc-surface-subtle);
      border: 1px solid color-mix(in srgb, var(--tc-border) 80%, transparent);
      border-radius: var(--tc-radius-card);
    }

    .tc-sync__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--tc-space-16);
      padding-bottom: var(--tc-space-17);
      border-bottom: 1px solid var(--tc-border);
    }

    .tc-sync__device {
      @include tc-text-subhead;

      display: flex;
      align-items: center;
      gap: var(--tc-space-8);
      margin: 0;
      color: var(--tc-text-body);
    }

    .tc-sync__device-icon {
      display: inline-flex;
      padding: var(--tc-space-7);
      background: var(--tc-success-bg);
      border: 1px solid var(--tc-success-ink);
      border-radius: var(--tc-radius-chip);
      color: var(--tc-primary);
    }
  `,
})
export class SyncCard {
  readonly deviceName = input.required<string>();
  readonly deviceStatus = input.required<string>();
  readonly deviceIcon = input.required<string>();
}
