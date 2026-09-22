import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../shared/ui/button/button';
import { ChecklistItem } from '../../shared/ui/checklist-item/checklist-item';
import { EquipmentChip } from '../../shared/ui/equipment-chip/equipment-chip';
import { Icon } from '../../shared/ui/icon/icon';
import { ImageBadge } from '../../shared/ui/image-badge/image-badge';
import { MetricTile } from '../../shared/ui/metric-tile/metric-tile';
import { StepItem } from '../../shared/ui/step-item/step-item';
import { RECIPE_DETAIL_VIEW } from './recipe-detail.mock';

/** W-06 — Detalle de receta y flujo de pasos (Recetario). */
@Component({
  selector: 'tc-recipe-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    RouterLink,
    Button,
    ChecklistItem,
    EquipmentChip,
    Icon,
    ImageBadge,
    MetricTile,
    StepItem,
  ],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export default class RecipeDetail {
  protected readonly view = RECIPE_DETAIL_VIEW;
}
