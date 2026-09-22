import { TRANSFER_ROWS, TRANSFER_SUMMARY } from '../../shared/mocks/recipe.mock';
import { RecipeStep, TransferSummary } from '../../shared/mocks/recipe.model';

/**
 * W-22 view data. The processes, their row order and the screen figures
 * all come from the shared mock; only the copy this screen adds sits
 * here.
 */
export interface ConfirmTransferView {
  readonly backLabel: string;
  readonly title: string;
  readonly leadBefore: string;
  readonly leadRecipe: string;
  readonly leadAfter: string;
  readonly tableCaption: string;
  readonly rows: readonly RecipeStep[];
  readonly summary: TransferSummary;
  readonly sendAction: string;
  readonly editAction: string;
  readonly backTarget: string;
}

export const CONFIRM_TRANSFER_VIEW: ConfirmTransferView = {
  backLabel: 'Volver',
  title: 'Confirmar y enviar al móvil',
  leadBefore: 'Revisa la secuencia consolidada de temporizadores acústicos configurados para ',
  leadRecipe: '‘Pollo al horno con arroz’',
  leadAfter: ' antes de transmitirlos a tu dispositivo.',
  tableCaption: 'Resumen final de alarmas: proceso, duración, canal, sonido y estado',
  rows: TRANSFER_ROWS,
  summary: TRANSFER_SUMMARY,
  sendAction: 'Enviar a mi celular',
  editAction: 'Modificar alarmas',
  backTarget: '/mockups/w-13',
};
