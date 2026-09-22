import { RECIPE_POLLO_AL_HORNO } from '../../shared/mocks/recipe.mock';
import { Recipe } from '../../shared/mocks/recipe.model';

/**
 * W-06 view data. The recipe itself lives in the shared mock so W-13,
 * W-22 and W-24 project the same copy (CLAUDE.md §1); only the labels
 * this screen adds around it are declared here.
 */
export interface RecipeDetailView {
  readonly backLabel: string;
  readonly recipe: Recipe;
  readonly primaryAction: string;
  readonly primaryActionHint: string;
  readonly equipmentTitle: string;
  readonly ingredientsTitle: string;
  readonly ingredientsSubtitle: string;
  readonly ingredientsCount: string;
  readonly stepsTitle: string;
  readonly stepsSubtitle: string;
  readonly stepsTotalLabel: string;
  readonly stepsTotalValue: string;
  readonly secondaryAction: string;
  readonly startAction: string;
  readonly startTarget: string;
}

export const RECIPE_DETAIL_VIEW: RecipeDetailView = {
  backLabel: 'Volver',
  recipe: RECIPE_POLLO_AL_HORNO,
  primaryAction: 'Configurar alarmas automáticamente',
  primaryActionHint: 'Ajuste de temporizadores en cola en un solo clic',
  equipmentTitle: 'Equipamiento activo requerido',
  ingredientsTitle: 'Ingredientes Necesarios',
  ingredientsSubtitle: 'Verifique la disponibilidad antes de inicializar las alarmas.',
  ingredientsCount: '5 elementos',
  stepsTitle: 'Flujo de Pasos y Alarmas Secuenciales',
  stepsSubtitle: 'Estructura cronológica para ejecución automatizada en pantalla W-12.',
  stepsTotalLabel: 'Total:',
  stepsTotalValue: '4 temporizadores encadenados',
  secondaryAction: 'Modificar Receta',
  startAction: 'Preparar receta',
  startTarget: '/mockups/w-24',
};
