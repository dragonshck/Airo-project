package com.example.airobuilder.ui.onboarding

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.viewpager2.widget.ViewPager2
import com.example.airobuilder.R
import com.example.airobuilder.adapter.OnBoardingAdapter
import com.example.airobuilder.data.model.BoardingModel
import com.example.airobuilder.databinding.ActivityOnBoardingBinding
import com.example.airobuilder.ui.MainActivity

class OnBoardingActivity : AppCompatActivity() {
    private lateinit var binding: ActivityOnBoardingBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOnBoardingBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (restorePrefData()) {
            val intent = Intent(applicationContext, MainActivity::class.java)
            startActivity(intent)
            finish()
        }

        buttonAction()
        setDataBoarding()
    }

    private fun setDataBoarding() {
        val model = listOf(
            BoardingModel(
                img = R.drawable.ic_vector_1,
                title = getString(R.string.find_article),
                description = getString(R.string.boarding_1)
            ),
            BoardingModel(
                img = R.drawable.ic_vector_2,
                title = getString(R.string.personalize_recommendation),
                description = getString(R.string.boarding_2)
            ),
            BoardingModel(
                img = R.drawable.ic_vector_3,
                title = getString(R.string.find_pc_component),
                description = getString(R.string.boarding_3)
            )
        )

        binding.vp.adapter = OnBoardingAdapter(this, model)

        binding.vp.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {

            override fun onPageSelected(position: Int) {
                binding.apply {
                    when (position) {
                        0 -> {
                            btnBack.visibility = View.GONE
                            btnNext.text = getString(R.string.next)
                            tvSkip.visibility = View.VISIBLE
                            setIndicator(0)
                        }
                        1 -> {
                            btnBack.visibility = View.VISIBLE
                            btnNext.text = getString(R.string.next)
                            tvSkip.visibility = View.VISIBLE
                            setIndicator(1)
                        }
                        2 -> {
                            btnBack.visibility = View.VISIBLE
                            btnNext.text = getString(R.string.start)
                            tvSkip.visibility = View.GONE
                            setIndicator(2)
                        }
                    }
                }
            }
        })
    }

    private fun setIndicator(index: Int) {
        when(index) {
            0 -> {
                binding.nav1.setBackgroundResource(R.drawable.bg_nav_active)
                binding.nav2.setBackgroundResource(R.drawable.bg_nav_nonactive)
                binding.nav3.setBackgroundResource(R.drawable.bg_nav_nonactive)
            }
            1 -> {
                binding.nav1.setBackgroundResource(R.drawable.bg_nav_active)
                binding.nav2.setBackgroundResource(R.drawable.bg_nav_active)
                binding.nav3.setBackgroundResource(R.drawable.bg_nav_nonactive)
            }
            2 -> {
                binding.nav1.setBackgroundResource(R.drawable.bg_nav_active)
                binding.nav2.setBackgroundResource(R.drawable.bg_nav_active)
                binding.nav3.setBackgroundResource(R.drawable.bg_nav_active)
            }
        }
    }

    private fun buttonAction() {
       binding.apply {
           btnNext.setOnClickListener {
               if(vp.currentItem != 2) {
                   vp.currentItem++
               } else {
                   val intent = Intent(this@OnBoardingActivity, MainActivity::class.java)
                   startActivity(intent)
                   savePrefData()
               }
           }
           btnBack.setOnClickListener {
               vp.currentItem--
           }
           tvSkip.setOnClickListener {
               val intent = Intent(this@OnBoardingActivity, MainActivity::class.java)
               startActivity(intent)
               savePrefData()
           }
       }
    }

   private fun savePrefData() {
       val sharedPref = applicationContext.getSharedPreferences("onBoarding", Context.MODE_PRIVATE)
       val editor = sharedPref!!.edit()
       editor.putBoolean("isFirstTime", true)
       editor.apply()
   }

    private fun restorePrefData(): Boolean {
        val sharedPref = applicationContext.getSharedPreferences("onBoarding", Context.MODE_PRIVATE)

        return sharedPref.getBoolean("isFirstTime", false)
    }
}