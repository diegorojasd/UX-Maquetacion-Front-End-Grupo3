package com.example.app

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.ProgressBar
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class m03_cola_Alarmas : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_m03_cola_alarmas)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        findViewById<TextView>(R.id.nombreReceta).text = CookingSession.RECIPE
        findViewById<TextView>(R.id.chipProcesos).text = CookingSession.PROCESS_COUNT

        val alert = CookingSession.alert
        findViewById<TextView>(R.id.nombreActivo).text = alert.name
        findViewById<TextView>(R.id.chipActivo).text = alert.statusLabel
        findViewById<TextView>(R.id.tiempoActivo).text = alert.remaining
        findViewById<ProgressBar>(R.id.barraActiva).apply {
            progress = alert.progress
            contentDescription = "Progreso de ${alert.name}"
        }

        // The two compact cards are the same included layout.
        fillCompact(R.id.cardHorno, CookingSession.secondary[0])
        fillCompact(R.id.cardSalsa, CookingSession.secondary[1])

        findViewById<View>(R.id.btnFinalizar).setOnClickListener {
            startActivity(Intent(this, m07_proceso_terminado::class.java))
        }

        // Detener, Pausar and Pausar todo have no listener: CLAUDE.md §3 rules
        // out real timers in this phase.
    }

    private fun fillCompact(cardId: Int, process: CookingProcess) {
        val card = findViewById<View>(cardId)
        card.findViewById<TextView>(R.id.nombreProceso).text = process.name
        card.findViewById<TextView>(R.id.chipEstado).text = process.statusLabel
        card.findViewById<TextView>(R.id.tiempoRestante).text = process.remaining
        card.findViewById<ProgressBar>(R.id.barraProgreso).apply {
            progress = process.progress
            contentDescription = "Progreso de ${process.name}"
        }
        card.findViewById<View>(R.id.btnPausarProceso).contentDescription =
            "Pausar ${process.name}"
    }
}
