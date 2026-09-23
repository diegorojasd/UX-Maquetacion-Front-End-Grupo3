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
import '../../shared/ui/search-bar/search-bar';
import { Select } from '../../shared/ui/select/select';
import { SearchBar } from '../../shared/ui/search-bar/search-bar';
import { RECIPE_LIST_VIEW } from './recipe-list.mock';

/** W-02 — Lista de recetas comunes (Recetario). */
@Component({
  selector: 'tc-recipe-list',
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
    Select,
    SearchBar,
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export default class RecipeList {
  protected readonly view = RECIPE_LIST_VIEW;
}
