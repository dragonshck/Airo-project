package com.example.airobuilder.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.airobuilder.data.repository.FavoriteRepository
import com.example.airobuilder.data.responses.Article
import com.example.airobuilder.data.responses.ResultResponse
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import java.util.ArrayList

class HomeViewModel(private val favoriteRepository: FavoriteRepository) : ViewModel() {
    private val _article = MutableStateFlow<ResultResponse<Article>>(ResultResponse.Loading)
    val article = _article.asStateFlow()

    private val _articles = MutableStateFlow<ResultResponse<ArrayList<Article>>>(ResultResponse.Loading)
    val articles = _articles.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading = _isLoading.asStateFlow()

    fun getArticle() {
        viewModelScope.launch {
            favoriteRepository.getArticle().collect {
                _articles.value = it
            }
        }
    }

    fun getArticleDetail(id: Int) {
        _article.value = ResultResponse.Loading

        viewModelScope.launch {
            favoriteRepository.getArticleDetail(id).collect {
                _article.value = it
            }
        }
        _isLoading.value = true
    }
}