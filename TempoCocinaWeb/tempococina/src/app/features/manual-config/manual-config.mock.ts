import { ALARM_SOUNDS, DETECTED_ROWS } from '../../shared/mocks/recipe.mock';
import { RecipeStep } from '../../shared/mocks/recipe.model';

/** W-13 view data. The processes and the sound catalog are shared. */
export interface ManualConfigView {
  readonly backLabel: string;
  readonly title: string;
  readonly lead: string;
  readonly cardTitle: string;
  readonly processCount: string;
  readonly tableCaption: string;
  readonly rows: readonly RecipeStep[];
  readonly sounds: readonly string[];
  readonly unitLabel: string;
  readonly addAction: string;
  readonly deviceStatus: string;
  readonly reconfigureAction: string;
  readonly confirmAction: string;
  readonly confirmTarget: string;
  readonly backTarget: string;
}

export const MANUAL_CONFIG_VIEW: ManualConfigView = {
  backLabel: 'Volver',
  title: 'Configuración manual',
  lead: 'Revisa y ajusta los procesos, tiempos y sonidos antes de transferir la secuencia a tu dispositivo móvil.',
  cardTitle: 'Resumen editable de alarmas detectadas',
  processCount: '4 procesos',
  tableCaption: 'Alarmas detectadas: proceso, tiempo asignado y sonido de alarma',
  rows: DETECTED_ROWS,
  sounds: ALARM_SOUNDS,
  unitLabel: 'minutos',
  addAction: 'Agregar proceso manual',
  deviceStatus: 'Dispositivo vinculado',
  reconfigureAction: 'Reconfigurar manualmente',
  confirmAction: 'Confirmar y enviar al móvil',
  confirmTarget: '/mockups/w-22',
  backTarget: '/mockups',
};
