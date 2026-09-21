import { Recipe } from './recipe.model';

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
      icon: 'bell',
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
      meta: [
        { label: 'Finalización del lote', tone: 'neutral' },
        { label: 'Notificación acústica activa', tone: 'critical', icon: 'bell' },
      ],
    },
  ],
};
