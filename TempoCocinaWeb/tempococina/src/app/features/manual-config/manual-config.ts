import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BackLink } from '../../shared/ui/back-link/back-link';
import { Button } from '../../shared/ui/button/button';
import { Icon } from '../../shared/ui/icon/icon';
import { StatusBadge } from '../../shared/ui/status-badge/status-badge';
import { MANUAL_CONFIG_VIEW } from './manual-config.mock';

/**
 * W-13 — Configuración manual (Detección automática).
 *
 * The only screen in the deliverable with real controls, so it is built
 * with reactive forms: a FormArray seeded from the shared mock. Nothing
 * is submitted and nothing is persisted (CLAUDE.md §3) — the form exists
 * so the fields behave like fields.
 *
 * The table lives here rather than in shared/ui because it is bound to
 * this screen's FormArray and no other screen uses it; CLAUDE.md §9 puts
 * a component in shared/ui only once a second screen needs it. What the
 * two tables do share — the header band — is a mixin, so they stay
 * visually identical without being coupled.
 */
@Component({
  selector: 'tc-manual-config',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, BackLink, Button, Icon, StatusBadge],
  templateUrl: './manual-config.html',
  styleUrl: './manual-config.scss',
})
export default class ManualConfig {
  private readonly fb = inject(FormBuilder);

  protected readonly view = MANUAL_CONFIG_VIEW;

  protected readonly form = this.fb.group({
    entries: this.fb.array(
      this.view.rows.map((step, index) =>
        this.fb.group({
          // The table numbers rows by position, not by the process's
          // place in the sequence: its row 01 is the chicken, which is
          // 02 everywhere else (docs/screens/W-13.md, G13).
          rowNumber: this.fb.nonNullable.control(String(index + 1).padStart(2, '0')),
          name: this.fb.nonNullable.control(step.detectedLabel),
          minutes: this.fb.nonNullable.control(step.assignedMinutes),
          sound: this.fb.nonNullable.control(step.alarmSound),
          // Seeded from the mock and left alone: the design never states
          // which icon belongs to which sound, so the icon does not
          // follow the select in this phase (docs/screens/W-13.md).
          soundIcon: this.fb.nonNullable.control(step.alarmSoundIcon),
        }),
      ),
    ),
  });

  protected get entries() {
    return this.form.controls.entries;
  }
}
