package com.example.airobuilder.ui.onboarding

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.airobuilder.data.model.BoardingModel
import com.example.airobuilder.databinding.FragmentOnBoardingBinding

class OnBoardingFragment : Fragment() {
    private var _binding: FragmentOnBoardingBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentOnBoardingBinding.inflate(inflater, container, false)
        val view = binding.root

        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val model = arguments?.getParcelable<BoardingModel>("arg")
        binding.ivBoarding1.setImageResource(model?.img ?: 0)
        binding.tvFindArticle.text = model?.title
        binding.tvDesc1.text = model?.description
    }

    override fun onDestroyView() {
        super.onDestroyView()

        _binding = null
    }
}