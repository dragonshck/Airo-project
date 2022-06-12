package com.example.airobuilder.ui

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.viewModels
import androidx.lifecycle.repeatOnLifecycle
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.airobuilder.adapter.ArticleAdapter
import com.example.airobuilder.data.responses.Article
import com.example.airobuilder.data.responses.ResultResponse
import com.example.airobuilder.databinding.FragmentHomeBinding
import com.example.airobuilder.ui.ArticleDetailActivity.Companion.EXTRA_ID_ARTICLE
import com.example.airobuilder.viewmodel.HomeViewModel
import com.example.airobuilder.viewmodel.ViewModelFactory
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import java.util.ArrayList

class HomeFragment : Fragment() {
    private var _binding: FragmentHomeBinding? = null
    private val binding get() =_binding
    private val homeViewModel: HomeViewModel by viewModels {
        ViewModelFactory.getInstance(requireContext())
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        _binding = FragmentHomeBinding.inflate(layoutInflater, container, false)

        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                launch {
                    homeViewModel.articles.collect { result ->
                        listArticleAdapter(result)
                    }
                }

                launch {
                    homeViewModel.article.collect {
                        showLoading(true)
                        homeViewModel.getArticle()
                    }
                }

                launch {
                    homeViewModel.isLoading.collect { loaded ->
                        if (loaded)  {
                            showLoading(true)
                        } else {
                            showLoading(false)
                        }
                    }
                }
            }
        }
        return binding?.root
    }

    private fun listArticleAdapter(result: ResultResponse<ArrayList<Article>>) {
        when (result) {
            is ResultResponse.Loading -> {
                showLoading(true)
            }

            is ResultResponse.Error -> {
                showLoading(false)
                errOcc()
            }

            is ResultResponse.Success -> {
                val listArticleAdapter = ArticleAdapter(result.data)

                binding?.rvArticles?.apply {
                    layoutManager = LinearLayoutManager(requireContext())
                    adapter = listArticleAdapter
                    setHasFixedSize(true)
                }

                listArticleAdapter.setOnItemClickCallback(object : ArticleAdapter.OnItemClickCallback {
                    override fun onItemClicked(article: Article) {
                        toDetailArticle(article)
                    }
                })
                showLoading(false)
            }
        }
    }

    private fun errOcc() {
        Toast.makeText(requireContext(), "An error occurred", Toast.LENGTH_SHORT).show()
    }

    private fun showLoading(isLoading: Boolean) {
        if (isLoading) binding?.pbLoading?.visibility = View.VISIBLE
        else binding?.pbLoading?.visibility = View.GONE
    }

    private fun toDetailArticle(article: Article) {
        Intent(requireContext(), ArticleDetailActivity::class.java).apply {
            putExtra(EXTRA_ID_ARTICLE, article.id)
        }.also {
            startActivity(it)
        }
    }

    override fun onDestroy() {
        _binding = null

        super.onDestroy()
    }
}