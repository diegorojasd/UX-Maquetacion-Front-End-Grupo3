import { RECIPE_POLLO_AL_HORNO } from '../../shared/mocks/recipe.mock';
import { Recipe } from '../../shared/mocks/recipe.model';

/**
 *
 */
export interface RecipeListView {
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

export const RECIPE_LIST_VIEW: RecipeListView = {
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
