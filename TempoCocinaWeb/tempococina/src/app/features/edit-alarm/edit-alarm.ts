import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BackLink } from '../../shared/ui/back-link/back-link';
import { Button } from '../../shared/ui/button/button';
import { ChecklistItem } from '../../shared/ui/checklist-item/checklist-item';
import { EquipmentChip } from '../../shared/ui/equipment-chip/equipment-chip';
import { Icon } from '../../shared/ui/icon/icon';
import { ImageBadge } from '../../shared/ui/image-badge/image-badge';
import { MetricTile } from '../../shared/ui/metric-tile/metric-tile';
import { StepItem } from '../../shared/ui/step-item/step-item';
import { EDIT_ALARM_VIEW } from './edit-alarm.mock';

/** W-06 — Detalle de receta y flujo de pasos (Recetario). */
@Component({
  selector: 'tc-edit-alarm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    BackLink,
    Button,
    ChecklistItem,
    EquipmentChip,
    Icon,
    ImageBadge,
    MetricTile,
    StepItem,
  ],
  templateUrl: './edit-alarm.html',
  styleUrl: './edit-alarm.scss',
})
export default class EditAlarm {
  protected readonly view = EDIT_ALARM_VIEW;
}
