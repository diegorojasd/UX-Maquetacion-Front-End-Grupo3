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

        findViewById<TextView>(R.id.textoBanner).text = CookingSession.MODE_BANNER
        findViewById<TextView>(R.id.nombreReceta).text = CookingSession.RECIPE
        findViewById<TextView>(R.id.chipProcesos).text = CookingSession.PROCESS_COUNT

        // Horno is the one in alert at this point in the session, not Arroz.
        val active = CookingSession.secondary[0]
        val snapshot = active.finished
        findViewById<TextView>(R.id.nombreActivo).text = active.name
        findViewById<TextView>(R.id.chipActivo).text = snapshot.statusLabel
        findViewById<TextView>(R.id.tiempoActivo).text = snapshot.remaining
        findViewById<TextView>(R.id.inicioProceso).text = snapshot.startLabel
        findViewById<TextView>(R.id.faltanProceso).text = snapshot.remainingHint
        findViewById<ProgressBar>(R.id.barraActiva).apply {
            progress = snapshot.progress
            contentDescription = "Progreso de ${active.name}"
        }

        fillCard(R.id.cardArroz, CookingSession.alert)
        fillCard(R.id.cardSalsa, CookingSession.secondary[1])

        // "Finalizar sesión de cocina" is not wired: nothing in the prototype
        // shared so far shows where it goes from here (docs/screens/M-07.md).
        // Detener, Pausar and Pausar todo have no listener either — §3 rules
        // out real timers in this phase.
    }

    private fun fillCard(cardId: Int, process: CookingProcess) {
        val card = findViewById<View>(cardId)
        val snapshot = process.finished
        val done = snapshot.state == SnapshotState.COMPLETED

        card.findViewById<TextView>(R.id.nombreProceso).apply {
            text = process.name
            if (done) setTextColor(getColor(R.color.text_disabled))
        }
        card.findViewById<View>(R.id.puntoEstado).setBackgroundResource(
            if (done) R.drawable.bg_dot_disabled else R.drawable.bg_dot_secondary
        )
        card.findViewById<TextView>(R.id.chipEstado).apply {
            text = snapshot.statusLabel
            if (done) {
                setBackgroundResource(R.drawable.bg_chip_disabled)
            } else {
                // Reducción reads as a soft alert here, not as the neutral
                // grey M-03 gives it (docs/screens/M-07.md).
                setBackgroundResource(R.drawable.bg_chip_critical_soft)
                setTextColor(getColor(R.color.secondary))
            }
        }
        card.findViewById<TextView>(R.id.tiempoRestante).apply {
            text = snapshot.remaining
            if (done) setTextColor(getColor(R.color.text_disabled))
        }
        card.findViewById<ProgressBar>(R.id.barraProgreso).apply {
            progress = snapshot.progress
            contentDescription = "Progreso de ${process.name}"
            if (done) progressTintList = getColorStateList(R.color.bar_plan)
        }

        // A finished process cannot be paused: the control keeps its shape and
        // only loses its ink (§8).
        card.findViewById<View>(R.id.btnPausarProceso).apply {
            contentDescription = if (done) {
                "Pausar ${process.name}, no disponible"
            } else {
                "Pausar ${process.name}"
            }
            if (done) {
                isEnabled = false
                isClickable = false
                isFocusable = false
                setBackgroundResource(R.drawable.bg_btn_small_disabled)
            }
        }
        if (done) {
            card.findViewById<TextView>(R.id.etiquetaPausar)
                .setTextColor(getColor(R.color.text_disabled))
            card.findViewById<ImageView>(R.id.iconoPausar)
                .setColorFilter(getColor(R.color.text_disabled))
        }
    }
}
