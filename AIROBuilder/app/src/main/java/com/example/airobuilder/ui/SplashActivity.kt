package com.example.airobuilder.ui

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.app.ActivityOptions
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.airobuilder.ui.onboarding.OnBoardingActivity
import com.example.airobuilder.databinding.ActivitySplashBinding

class SplashActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySplashBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)

        playAnimation()
    }

    private fun playAnimation() {
        binding.ivLogo.alpha = 0f
        binding.tvCopyright.alpha = 0f
        binding.ivLogo.animate().setDuration(3000).alpha(1f).withEndAction {

            val intent = Intent(this, OnBoardingActivity::class.java)
            startActivity(intent, ActivityOptions.makeSceneTransitionAnimation(this).toBundle())
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out)
            finish()
        }

        val copyright = ObjectAnimator.ofFloat(binding.tvCopyright, View.ALPHA, 1f).setDuration(1000)

        AnimatorSet().apply {
            playSequentially(copyright)
            start()
        }
    }
}