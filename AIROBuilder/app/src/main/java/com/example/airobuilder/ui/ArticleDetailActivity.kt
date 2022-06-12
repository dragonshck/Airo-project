package com.example.airobuilder.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.example.airobuilder.R
import com.example.airobuilder.data.model.ArticleModel
import com.example.airobuilder.data.responses.Article
import com.example.airobuilder.data.responses.ResultResponse
import com.example.airobuilder.databinding.ActivityDetailArticleBinding
import com.example.airobuilder.helper.Utils.Companion.setImageGlide
import com.example.airobuilder.viewmodel.HomeViewModel
import com.example.airobuilder.viewmodel.ViewModelFactory
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.collect

class ArticleDetailActivity : AppCompatActivity() {
    private var _binding: ActivityDetailArticleBinding? = null
    private val binding get() = _binding!!

    private var articleDetail: ArticleModel? = null
    private var id: Int? = null

    private val articleDetailViewModel: HomeViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        _binding = ActivityDetailArticleBinding.inflate(layoutInflater)
        setContentView(binding.root)
        id = intent.extras?.get(EXTRA_ID_ARTICLE) as Int

        setToolbar(getString(R.string.article))

        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                launch {
                    articleDetailViewModel.article.collect { result ->
                        onArticleDetail(result)
                    }
                }

                launch {
                    articleDetailViewModel.isLoading.collect { loaded ->
                        if (!loaded) articleDetailViewModel.getArticleDetail(id!!)
                        else showLoading(true)
                    }
                }
            }
        }
    }

    private fun setToolbar(title: String) {
        setSupportActionBar(binding.toolbar)
        supportActionBar?.apply {
            setDisplayShowHomeEnabled(true)
            setDisplayHomeAsUpEnabled(true)
            this.title = title
        }
    }

    private fun showLoading(isLoading: Boolean) {
        if (isLoading) binding.pbLoading.visibility = View.VISIBLE
        else binding.pbLoading.visibility = View.GONE
    }

    private fun parseArticleDetail(article: Article) {
        binding.apply {
            tvArticleTitle.text = article.title
            tvArticleContent.text = article.content
            ivArticleImg.setImageGlide(this@ArticleDetailActivity, article.photoUrl)
        }
    }

    private fun onArticleDetail(result: ResultResponse<Article>) {
        when (result) {
            is ResultResponse.Loading -> showLoading(true)
            is ResultResponse.Error -> {
                errOcc()
                showLoading(false)
                Toast.makeText(this, result.error, Toast.LENGTH_SHORT).show()
            }
            is ResultResponse.Success -> {
                result.data.let { article ->
                    parseArticleDetail(article)

                    val articleModel = ArticleModel(article.id, article.title, article.photoUrl, article.content)
                    articleDetail = articleModel
                }
                showLoading(false)
            }
        }
    }

    private fun errOcc() {
        Toast.makeText(this, "Terjadi Kesalahan", Toast.LENGTH_SHORT).show()
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()

        return true
    }

    companion object {
        const val EXTRA_ID_ARTICLE = "extra_id_article"
    }
}