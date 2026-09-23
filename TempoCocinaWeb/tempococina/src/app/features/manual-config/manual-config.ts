import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BackLink } from '../../shared/ui/back-link/back-link';
import { Button } from '../../shared/ui/button/button';
import { Icon } from '../../shared/ui/icon/icon';
import { StatusBadge } from '../../shared/ui/status-badge/status-badge';
import { MANUAL_CONFIG_VIEW } from './manual-config.mock';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tc-manual-config',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    BackLink,
    Button,
    Icon,
    StatusBadge
  ],
  templateUrl: './manual-config.html',
  styleUrl: './manual-config.scss',
})
export default class ManualConfig {
  private readonly fb = inject(FormBuilder);
  private readonly location = inject(Location);

  protected readonly view = MANUAL_CONFIG_VIEW;

  protected readonly form = this.fb.group({
    entries: this.fb.array(
      this.view.rows.map((step, index) =>
        this.fb.group({
          rowNumber: this.fb.nonNullable.control(String(index + 1).padStart(2, '0')),
          name: this.fb.nonNullable.control(step.detectedLabel),
          minutes: this.fb.nonNullable.control(step.assignedMinutes),
          sound: this.fb.nonNullable.control(step.alarmSound),
          soundIcon: this.fb.nonNullable.control(step.alarmSoundIcon),
        }),
      ),
    ),
  });

  protected get entries() {
    return this.form.controls.entries;
  }

  goBack(): void {
    this.location.back();
  }
}
