package com.example.app

import android.os.Bundle
import android.widget.Button
import android.content.Intent
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class m01_recetas : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_m01_recetas)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // "Modo cocina" leads to the audio-permission screen (M-02).
        findViewById<Button>(R.id.btnModoCocina).setOnClickListener {
            startActivity(Intent(this, m02_permiso_ModoCocina::class.java))
        }

        val btnEmpezar = findViewById<Button>(R.id.btnEmpezar)
        btnEmpezar.setOnClickListener {
            val intent = Intent(this, m13_alarma::class.java)
            startActivity(intent)
        }
    }
}
