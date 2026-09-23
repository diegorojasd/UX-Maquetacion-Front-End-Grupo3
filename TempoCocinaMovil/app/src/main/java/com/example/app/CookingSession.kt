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
)

enum class ProcessStatus { ALERT, RUNNING, REDUCTION }

object CookingSession {
    const val RECIPE = "Pollo al horno con arroz"
    const val PROCESS_COUNT = "3 procesos"

    val alert = CookingProcess(
        name = "Arroz",
        remaining = "05:22",
        progress = 78,
        statusLabel = "Alerta activa",
        status = ProcessStatus.ALERT,
    )

    /** The two cards that render in the compact variant, in mockup order. */
    val secondary = listOf(
        CookingProcess(
            name = "Horno",
            remaining = "28:53",
            progress = 45,
            statusLabel = "En cocción",
            status = ProcessStatus.RUNNING,
        ),
        CookingProcess(
            name = "Salsa",
            remaining = "12:47",
            progress = 60,
            // The mockup paints this chip neutral grey, although the design
            // system defines Chip · Warning for a reduction (§12).
            statusLabel = "Reducción",
            status = ProcessStatus.REDUCTION,
        ),
    )
}
