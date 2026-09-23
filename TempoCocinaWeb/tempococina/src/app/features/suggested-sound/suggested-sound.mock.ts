import { RECIPE_POLLO_AL_HORNO, SYNCED_DEVICE } from '../../shared/mocks/recipe.mock';
import { Recipe, SyncedDevice } from '../../shared/mocks/recipe.model';

/**
 * W-24 view data. The recipe, its four processes and the device come
 * from the shared mock; only the copy this screen adds is declared here.
 */
export interface SuggestedSoundView {
  readonly recipe: Recipe;
  readonly device: SyncedDevice;
  readonly title: string;
  readonly leadBefore: string;
  readonly leadRecipe: string;
  readonly leadAfter: string;
  readonly note: string;
  readonly backAction: string;
  /** W-02 (Lista de recetas comunes) is not implemented yet. */
  readonly backTarget: string;
}

export const SUGGESTER_SOUND: SuggestedSoundView = {
  recipe: RECIPE_POLLO_AL_HORNO,
  device: SYNCED_DEVICE,
  title: 'Sonido Sugerido',
  leadBefore: 'Los 4 temporizadores y perfiles acústicos de ',
  leadRecipe: '"Pollo al horno con arroz"',
  leadAfter: ' se han transferido correctamente a tu dispositivo móvil.',
  note: 'El control activo de la cocción y el monitoreo de tiempos ahora se ejecutan de forma concurrente en la app móvil. Cualquier ajuste manual en tu teléfono se reflejará aquí en tiempo real.',
  backAction: 'Volver al recetario',
  backTarget: '/mockups',
};
