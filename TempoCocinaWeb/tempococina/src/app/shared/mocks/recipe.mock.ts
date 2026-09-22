import { Recipe, RecipeStep, SyncedDevice, TransferSummary } from './recipe.model';

/**
 * "Pollo al horno con arroz" — the recipe W-06, W-13, W-22 and W-24 all
 * show (CLAUDE.md §1). Copy transcribed verbatim from the Figma frames;
 * never translated, paraphrased or corrected.
 *
 * Known inconsistency, transcribed as designed (docs/screens/W-06.md, D4):
 * the "Tiempo Total" tile reads 45 min, the four step timers add up to
 * 60 min, and CLAUDE.md §1 describes the recipe as 50 min.
 */
export const RECIPE_POLLO_AL_HORNO: Recipe = {
  id: 'PL-HR-04',
  eyebrow: 'Receta estándar de cocina',
  title: 'Pollo al horno con arroz',
  description:
    'Secuencia sincronizada de calor seco inicial y adición posterior de grano con caldo en tiempo real para cocción exacta sin sobreexposición térmica.',
  techniqueBadge: 'Horno',
  phasesBadge: '4 FASES TEMPORIZADAS',
  image: {
    src: 'assets/images/pollo-al-horno-con-arroz.jpg',
    alt: 'Pollo al horno con arroz servido en un plato sobre mesa de madera',
    width: 512,
    height: 286,
  },
  metrics: [
    { icon: 'clock', label: 'Tiempo total', value: '45', unit: 'min', tone: 'neutral' },
    {
      icon: 'bell-solid',
      label: 'Secuencia',
      value: '4',
      unit: 'alarmas',
      tone: 'accent',
      emphasizeValue: true,
    },
    { icon: 'trend', label: 'Dificultad', value: 'Media', tone: 'warning' },
    { icon: 'servings', label: 'Porciones', value: '4', unit: 'raciones', tone: 'servings' },
  ],
  equipment: [
    { id: 'horno', name: 'Horno Eléctrico / Gas', tone: 'accent' },
    { id: 'bandeja', name: 'Bandeja profunda refractaria', tone: 'primary' },
    { id: 'sonda', name: 'Sonda de temperatura (opcional)', tone: 'muted' },
  ],
  ingredients: [
    { id: 'pollo', name: '1 pollo entero (1.5 kg)', note: 'Temp. Ambiente', checked: true },
    { id: 'arroz', name: '300g arroz blanco', note: 'Seco', checked: true },
    { id: 'ajo', name: '2 dientes de ajo', note: 'Picados finos', checked: true },
    { id: 'aceite', name: 'Aceite de oliva y sal', note: 'Al gusto', checked: true },
    { id: 'hierbas', name: 'Hierbas provenzales', note: '15g', checked: true },
  ],
  steps: [
    {
      id: 'precalentar',
      order: '01',
      title: 'Precalentar horno a 200°C',
      description:
        'Encender el horno con calor arriba y abajo. Colocar la rejilla en la posición intermedia y esperar hasta estabilizar la temperatura.',
      duration: '10 min',
      shortLabel: 'Precalentar horno',
      syncDuration: '10:00 min',
      tone: 'Bip constante',
      transferTitle: '3. Precalentar horno a 200°C',
      transferSubtitle: 'Convección activa',
      transferDuration: '10',
      channel: 'Horno #1',
      sound: 'Bip constante',
      soundIcon: 'volume',
      transferStatus: 'Listo',
      meta: [
        { label: 'Objetivo térmico:', value: '200°C', tone: 'neutral' },
        { label: 'Tipo:', value: 'Precalentamiento', tone: 'neutral' },
      ],
    },
    {
      id: 'pollo',
      order: '02',
      title: 'Introducir pollo sazonado',
      description:
        'Untar el pollo con aceite, sal, ajo picado y hierbas provenzales. Colocar en la fuente e iniciar la cocción primaria sin acompañamiento.',
      duration: '30 min',
      shortLabel: 'Sellado y cocción',
      syncDuration: '35:00 min',
      tone: 'Campana Suave',
      transferTitle: '1. Pollo al horno — Sellado y dorado',
      transferSubtitle: 'Térmica continua',
      criticalLabel: 'Fase crítica',
      transferDuration: '35',
      channel: 'Horno #1',
      sound: 'Campana Suave (Tono alt.)',
      soundIcon: 'bell',
      transferStatus: 'Listo',
      meta: [
        { label: 'Fase:', value: 'Dorado y sellado', tone: 'neutral' },
        { label: 'Disparo automático al finalizar', tone: 'success' },
      ],
    },
    {
      id: 'arroz',
      order: '03',
      title: 'Añadir arroz y caldo',
      description:
        'Abrir el horno cuidadosamente. Incorporar el arroz crudo distribuyéndolo por el fondo de la bandeja junto con el caldo caliente para absorción.',
      duration: '15 min',
      shortLabel: 'Absorción arroz',
      syncDuration: '15:00 min',
      tone: 'Campana horno',
      transferTitle: '2. Arroz — Absorción y cocción lenta',
      transferSubtitle: 'Monitoreo de ebullición suave',
      transferDuration: '15',
      channel: 'Anafe #2',
      sound: 'Campana horno (Predet.)',
      soundIcon: 'bell',
      transferStatus: 'Listo',
      meta: [
        { label: 'Caldo estimado:', value: '600 ml', tone: 'neutral' },
        { label: 'Fase:', value: 'Absorción simultánea', tone: 'neutral' },
      ],
    },
    {
      id: 'reposo',
      order: '04',
      title: 'Reposo final y verificación',
      description:
        'Apagar el horno, entreabrir la puerta y dejar reposar 5 minutos para asentar jugos antes del trinchado y servicio en mesa.',
      duration: '5 min',
      shortLabel: 'Reposo final',
      syncDuration: '05:00 min',
      tone: 'Chime suave',
      transferTitle: '4. Reposo final de asado y trinchado',
      transferSubtitle: 'Estabilización de jugos internos',
      transferDuration: '05',
      channel: 'Mesa de pase',
      sound: 'Chime suave',
      soundIcon: 'volume',
      transferStatus: 'Listo',
      meta: [
        { label: 'Finalización del lote', tone: 'neutral' },
        { label: 'Notificación acústica activa', tone: 'critical', icon: 'bell-solid' },
      ],
    },
  ],
};

/**
 * The phone the sequence was transferred to (W-24). The icon is the
 * plain `phone` symbol: the design does not use a distinct "phone-ok"
 * mark, the green box and the badge carry the synced meaning
 * (docs/screens/W-24.md, E7).
 */
export const SYNCED_DEVICE: SyncedDevice = {
  name: 'Móvil Pixel 8',
  status: 'Sincronizado y listo',
  icon: 'phone',
};

/**
 * Row order of the transfer review (W-22). The screen numbers the same
 * four processes 1–4 in an order that puts the chicken before the
 * preheat, contradicting both its own timeline and every other screen.
 * Declared explicitly rather than sorted, so the deviation stays visible
 * (docs/screens/W-22.md, F1).
 */
export const TRANSFER_ROWS: readonly RecipeStep[] = [
  RECIPE_POLLO_AL_HORNO.steps[1], // 1. Pollo al horno
  RECIPE_POLLO_AL_HORNO.steps[2], // 2. Arroz
  RECIPE_POLLO_AL_HORNO.steps[0], // 3. Precalentar horno
  RECIPE_POLLO_AL_HORNO.steps[3], // 4. Reposo final
];

/**
 * Screen-level figures for W-22. Both the total and the segment widths
 * are transcribed from the design, never derived from the row
 * durations — the processes overlap.
 */
export const TRANSFER_SUMMARY: TransferSummary = {
  heading: 'Resumen final de alarmas',
  headingCount: '(4 procesos programados)',
  sequenceStatus: 'Secuencia completa',
  totalLabel: 'Tiempo acumulado total:',
  totalValue: '50 min',
  earliestLabel: 'Alarma más temprana:',
  earliestValue: '+10 min',
  finalLabel: 'Alarma final:',
  finalValue: '+50 min',
  timelineTitle: 'Distribución temporal estimada',
  syncableLabel: '100% Sincronizable',
  segments: [
    { stepId: 'precalentar', label: 'Precalentado', percent: 20, tone: 'muted' },
    { stepId: 'arroz', label: 'Arroz', percent: 30, tone: 'deep' },
    { stepId: 'pollo', label: 'Pollo asado', percent: 40, tone: 'primary' },
    { stepId: 'reposo', label: 'Reposo final', percent: 10, tone: 'accent' },
  ],
  marks: [
    { label: '00m (Inicio)' },
    { label: '+10m' },
    { label: '+25m' },
    { label: '+45m' },
    { label: '+50m (Servido)', emphasis: true },
  ],
};
