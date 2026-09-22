/**
 * Shape of the recipe shared by W-06, W-13, W-22 and W-24 (CLAUDE.md §1).
 * Each screen projects the fields it shows; the copy is never retyped.
 */

/** Drives an icon's tint on a metric tile. Never the only carrier of meaning. */
export type MetricTone = 'neutral' | 'accent' | 'warning' | 'servings';

export interface RecipeMetric {
  readonly icon: string;
  readonly label: string;
  readonly value: string;
  readonly unit?: string;
  readonly tone: MetricTone;
  /** The accent tint the mockup applies to the value itself, not just the icon. */
  readonly emphasizeValue?: boolean;
}

export type EquipmentTone = 'accent' | 'primary' | 'muted';

export interface RecipeEquipment {
  readonly id: string;
  readonly name: string;
  readonly tone: EquipmentTone;
}

export interface RecipeIngredient {
  readonly id: string;
  readonly name: string;
  /** Right-hand chip: "Temp. Ambiente", "Seco", "15g", … */
  readonly note: string;
  readonly checked: boolean;
}

export type StepMetaTone = 'neutral' | 'success' | 'critical';

export interface RecipeStepMeta {
  readonly label: string;
  /** Emphasized half of a "label: value" pair; absent when the whole item is the label. */
  readonly value?: string;
  readonly tone: StepMetaTone;
  readonly icon?: string;
}

export interface RecipeStep {
  readonly id: string;
  /** Zero-padded as shown in the badge: "01" … "04". */
  readonly order: string;
  readonly title: string;
  readonly description: string;
  readonly duration: string;
  readonly meta: readonly RecipeStepMeta[];
  /** Condensed title used once the process is transferred (W-24). */
  readonly shortLabel: string;
  /**
   * Duration as the transfer screens print it ("10:00 min"). Kept apart
   * from `duration` because W-24 does not merely reformat W-06: process
   * 02 reads 35 minutes there and 30 here (docs/screens/W-24.md, E2/E3).
   */
  readonly syncDuration: string;
  /** Alarm tone assigned to the process on the phone. */
  readonly tone: string;

  /**
   * Fields the confirm-and-transfer review adds (W-22). It names the
   * same four processes a third way and re-numbers them in an order
   * that differs from every other screen (docs/screens/W-22.md, F1/F2).
   */
  readonly transferTitle: string;
  readonly transferSubtitle: string;
  /** Present only on the process the design flags in accent. */
  readonly criticalLabel?: string;
  /** Minutes as the table prints them, zero-padded ("05"). */
  readonly transferDuration: string;
  readonly channel: string;
  readonly sound: string;
  /** `bell` for a chime, `volume` for a tone — both from the sprite. */
  readonly soundIcon: string;
  readonly transferStatus: string;
}

/** One band of the estimated time distribution (W-22). */
export interface TimelineSegment {
  readonly stepId: string;
  readonly label: string;
  /**
   * Width as the design draws it, NOT derived from the durations: the
   * processes overlap, so the chicken's 35 min is drawn as 40 % of a
   * 50-minute span (docs/screens/W-22.md, F5). Never recomputed.
   */
  readonly percent: number;
  readonly tone: 'muted' | 'deep' | 'primary' | 'accent';
}

/** A tick on the timeline axis. */
export interface TimelineMark {
  readonly label: string;
  /** The design sets the closing mark apart. */
  readonly emphasis?: boolean;
}

/** Screen-level figures for the transfer review (W-22). */
export interface TransferSummary {
  readonly heading: string;
  readonly headingCount: string;
  readonly sequenceStatus: string;
  readonly totalLabel: string;
  /**
   * Shown as designed. It is not the sum of the rows, which come to
   * 65 min, because the processes overlap (docs/screens/W-22.md, F4).
   */
  readonly totalValue: string;
  readonly earliestLabel: string;
  readonly earliestValue: string;
  readonly finalLabel: string;
  readonly finalValue: string;
  readonly timelineTitle: string;
  readonly syncableLabel: string;
  readonly segments: readonly TimelineSegment[];
  readonly marks: readonly TimelineMark[];
}

/** The phone a recipe's alarm sequence was transferred to (W-24). */
export interface SyncedDevice {
  readonly name: string;
  readonly status: string;
  readonly icon: string;
}

export interface RecipeImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface Recipe {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly techniqueBadge: string;
  readonly phasesBadge: string;
  readonly image: RecipeImage;
  readonly metrics: readonly RecipeMetric[];
  readonly equipment: readonly RecipeEquipment[];
  readonly ingredients: readonly RecipeIngredient[];
  readonly steps: readonly RecipeStep[];
}
