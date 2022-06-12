package com.example.airobuilder.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.airobuilder.data.repository.FavoriteRepository
import com.example.airobuilder.data.responses.Component
import com.example.airobuilder.data.responses.ResultResponse
import com.example.airobuilder.data.room.ComponentEntity
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

class DetailViewModel(private val favoriteRepository: FavoriteRepository) : ViewModel() {
    private val _componentDetail = MutableStateFlow<ResultResponse<Component>>(ResultResponse.Loading)
    val componentDetail = _componentDetail.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading = _isLoading.asStateFlow()

    fun getDetailComponent(id: Int) {
        viewModelScope.launch {
            _componentDetail.value = ResultResponse.Loading
            viewModelScope.launch {
                favoriteRepository.getComponentDetail(id).collect {
                    _componentDetail.value = it
                }
            }
            _isLoading.value = true
        }
    }

    fun isFavorite(id: Int): Flow<Boolean> = favoriteRepository.isFavorite(id)

    fun saveToFavorite(component: ComponentEntity) {
        viewModelScope.launch {
            favoriteRepository.saveFavorite(component)
        }
    }

    fun deleteFavorite(component: ComponentEntity) {
        viewModelScope.launch {
            favoriteRepository.deleteFavorite(component)
        }
    }
}