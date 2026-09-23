package com.example.app

/**
 * Sample data for the cooking session the mobile screens share.
 *
 * The screens built before this one keep every string and number inline in
 * their layout XML. M-03 needs the same row twice with different content, so
 * the two compact cards are one included layout filled from here — which also
 * gives M-07 somewhere to read the same session from later.
 *
 * Nothing counts down and nothing is persisted (CLAUDE.md §3): these are fixed
 * strings and fixed percentages, rendered once.
 */
data class CookingProcess(
    val name: String,
    /** Remaining time exactly as the mockup prints it. */
    val remaining: String,
    /**
     * Progress as drawn, 0–100. CLAUDE.md §12 documents ≈78 / 45 / 60 and says
     * to read the widths from Figma; the MCP was unreachable, so these are the
     * documented values, still to be confirmed.
     */
    val progress: Int,
    val statusLabel: String,
    val status: ProcessStatus,

    /**
     * Fields the end-of-session summary adds (M-07). The name differs from
     * `name` on purpose — the summary calls the same process "Pollo al horno"
     * where the active view calls it "Horno" — and CLAUDE.md §1 says to keep
     * both and not normalise them.
     */
    val summaryName: String,
    val plannedMin: Int,
    val realMin: Int,
    val deviationLabel: String,
    val deviationTone: DeviationTone,
)

/** Chip tone on the summary. `CRITICAL_SOFT` is not in the PDF catalog (§12). */
enum class DeviationTone { SUCCESS, CRITICAL_SOFT }

enum class ProcessStatus { ALERT, RUNNING, REDUCTION }

object CookingSession {
    const val RECIPE = "Pollo al horno con arroz"
    const val PROCESS_COUNT = "3 procesos"

    /** Session totals as the summary prints them. §12: the per-process real
     *  times (17 + 35 + 20) do not add up to 48 because the processes overlap.
     *  Not an error — keep the copy. */
    const val TOTAL_TIME = "Tiempo total: 48 min"
    const val ACCURACY = "92%"
    const val NET_DEVIATION = "+4 min"
    const val EXECUTED = "3 procesos ejecutados"
    const val SLIPPAGES = "2 ligeros desfases"
    const val ACCURACY_PROGRESS = 92

    val alert = CookingProcess(
        name = "Arroz",
        remaining = "05:22",
        progress = 78,
        statusLabel = "Alerta activa",
        status = ProcessStatus.ALERT,
        summaryName = "Arroz",
        plannedMin = 15,
        realMin = 17,
        deviationLabel = "+2 min desfase",
        deviationTone = DeviationTone.CRITICAL_SOFT,
    )

    /** The two cards that render in the compact variant, in mockup order. */
    val secondary = listOf(
        CookingProcess(
            name = "Horno",
            remaining = "28:53",
            progress = 45,
            statusLabel = "En cocción",
            status = ProcessStatus.RUNNING,
            summaryName = "Pollo al horno",
            plannedMin = 35,
            realMin = 35,
            deviationLabel = "A tiempo",
            deviationTone = DeviationTone.SUCCESS,
        ),
        CookingProcess(
            name = "Salsa",
            remaining = "12:47",
            progress = 60,
            // The mockup paints this chip neutral grey, although the design
            // system defines Chip · Warning for a reduction (§12).
            statusLabel = "Reducción",
            status = ProcessStatus.REDUCTION,
            summaryName = "Salsa (reducción)",
            plannedMin = 18,
            realMin = 20,
            deviationLabel = "Reducción +2m",
            deviationTone = DeviationTone.CRITICAL_SOFT,
        ),
    )

    /** All three, in the order the summary lists them. */
    val summary = listOf(alert) + secondary
}
