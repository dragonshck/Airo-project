package com.example.airobuilder.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import com.example.airobuilder.R
import com.example.airobuilder.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.navView.setItemSelected(R.id.navigation_home, true)

        supportFragmentManager
            .beginTransaction()
            .replace(R.id.nav_host_fragment, HomeFragment())
            .commit()

        navBottom()

        buttonAction()
    }

    private fun navBottom() {
        binding.navView.setOnItemSelectedListener {
            var fragment: Fragment? = null
            fragment = when (it) {
                R.id.navigation_personalize -> PersonalizeFragment()
                R.id.navigation_browsing -> BrowsingFragment()
                else -> HomeFragment()
            }
            if (fragment != null) {
                supportFragmentManager
                    .beginTransaction()
                    .replace(R.id.nav_host_fragment, fragment)
                    .commit()
            }
        }
    }

    private fun buttonAction() {
        binding.ibFavorite.setOnClickListener {
            Intent(this, FavoriteActivity::class.java).also {
                startActivity(it)
            }
        }
    }
}