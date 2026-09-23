package com.example.app

import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.ProgressBar
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class m07_proceso_terminado : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_m07_proceso_terminado)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        findViewById<TextView>(R.id.subtituloSesion).text =
            "${CookingSession.RECIPE} · ${CookingSession.TOTAL_TIME}"
        findViewById<TextView>(R.id.precisionGlobal).text = CookingSession.ACCURACY
        findViewById<TextView>(R.id.desviacionNeta).text = CookingSession.NET_DEVIATION
        findViewById<TextView>(R.id.procesosEjecutados).text = CookingSession.EXECUTED
        findViewById<TextView>(R.id.desfases).text = CookingSession.SLIPPAGES
        findViewById<ProgressBar>(R.id.barraPrecision).apply {
            progress = CookingSession.ACCURACY_PROGRESS
            contentDescription = "Precisión global ${CookingSession.ACCURACY}"
        }

        val icons = listOf(R.drawable.ic_pot, R.drawable.ic_oven, R.drawable.ic_pan)
        val rows = listOf(R.id.barrasArroz, R.id.barrasHorno, R.id.barrasSalsa)
        CookingSession.summary.forEachIndexed { i, process ->
            fillBars(rows[i], icons[i], process)
        }

        // "Evaluar" has no listener: M-09 is out of scope (CLAUDE.md §3).
    }

    private fun fillBars(rowId: Int, iconRes: Int, process: CookingProcess) {
        val row = findViewById<View>(rowId)
        row.findViewById<ImageView>(R.id.iconoProceso).setImageResource(iconRes)
        row.findViewById<TextView>(R.id.nombreResumen).text = process.summaryName
        row.findViewById<TextView>(R.id.tiemposResumen).text =
            "${process.plannedMin} min est. · ${process.realMin} min real"

        row.findViewById<TextView>(R.id.chipDesfase).apply {
            text = process.deviationLabel
            when (process.deviationTone) {
                DeviationTone.SUCCESS -> {
                    setBackgroundResource(R.drawable.bg_chip_success)
                    setTextColor(getColor(R.color.success_text))
                }
                DeviationTone.CRITICAL_SOFT -> {
                    setBackgroundResource(R.drawable.bg_chip_critical_soft)
                    setTextColor(getColor(R.color.secondary))
                }
            }
        }

        // Each pair is scaled against its own longer value, so the two bars of
        // a process are comparable with each other. The exact widths belong in
        // Figma, which was unreachable (docs/screens/M-07.md).
        val longest = maxOf(process.plannedMin, process.realMin)
        row.findViewById<ProgressBar>(R.id.barraPlan).apply {
            progress = process.plannedMin * 100 / longest
            contentDescription = "Planeado ${process.plannedMin} minutos"
        }
        row.findViewById<ProgressBar>(R.id.barraReal).apply {
            progress = process.realMin * 100 / longest
            contentDescription = "Real ${process.realMin} minutos"
        }
        row.findViewById<TextView>(R.id.valorPlan).text = "${process.plannedMin}m"
        row.findViewById<TextView>(R.id.valorReal).text = "${process.realMin}m"
    }
}
