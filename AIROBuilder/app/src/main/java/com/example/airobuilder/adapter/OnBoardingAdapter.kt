package com.example.airobuilder.adapter

import android.os.Bundle
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.example.airobuilder.ui.onboarding.OnBoardingFragment
import com.example.airobuilder.data.model.BoardingModel

class OnBoardingAdapter(fa: FragmentActivity, private val models: List<BoardingModel>) :
    FragmentStateAdapter(fa) {

    override fun getItemCount() = 3

    override fun createFragment(position: Int): Fragment {
        val onBoardingFragment = OnBoardingFragment()
        val bundle = Bundle()
        bundle.putParcelable("arg", models[position])
        onBoardingFragment.arguments = bundle
        return onBoardingFragment
    }
}
