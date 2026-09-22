package com.example.app

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class m02_permiso_ModoCocina : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_m02_permiso_modo_cocina)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // The three rows are the same included layout, filled here so the
        // markup is written once (CLAUDE.md §3).
        fillRow(
            R.id.filaVolumen,
            R.drawable.ic_volume,
            R.drawable.bg_tile_44,
            R.color.text_primary,
            "Alarma a volumen constante",
            "Se eleva automáticamente al sonar para vencer el ruido de campana y sartenes.",
        )
        fillRow(
            R.id.filaSilencio,
            R.drawable.ic_bell_off,
            R.drawable.bg_tile_44_secondary,
            R.color.secondary,
            "Ignora el interruptor de silencio",
            "Omite el modo No Molestar del sistema operativo de forma crítica.",
        )
        fillRow(
            R.id.filaVibracion,
            R.drawable.ic_vibrate,
            R.drawable.bg_tile_44,
            R.color.text_primary,
            "Vibración continua de alerta",
            "Patrón háptico repetitivo detectable incluso en el bolsillo o delantal.",
        )

        findViewById<View>(R.id.btnModoCocina).setOnClickListener {
            startActivity(Intent(this, m03_cola_Alarmas::class.java))
        }

        // "Ahora no" returns to whoever opened this screen, which is M-01.
        findViewById<View>(R.id.btnAhoraNo).setOnClickListener { finish() }

        // "Escuchar" plays nothing: CLAUDE.md §3 rules out audio in this phase.
    }

    private fun fillRow(
        rowId: Int,
        iconRes: Int,
        tileRes: Int,
        tintRes: Int,
        title: String,
        description: String,
    ) {
        val row = findViewById<View>(rowId)
        row.findViewById<View>(R.id.tilePermiso).setBackgroundResource(tileRes)
        row.findViewById<ImageView>(R.id.iconPermiso).apply {
            setImageResource(iconRes)
            imageTintList = getColorStateList(tintRes)
        }
        row.findViewById<TextView>(R.id.tituloPermiso).text = title
        row.findViewById<TextView>(R.id.descripcionPermiso).text = description
    }
}
