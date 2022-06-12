package com.example.airobuilder.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.airobuilder.data.repository.FavoriteRepository
import com.example.airobuilder.data.room.ComponentEntity
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

class FavoriteViewModel(private val favoriteRepository: FavoriteRepository) : ViewModel() {
    private val _favorite = MutableStateFlow(listOf<ComponentEntity>())
    val favorite = _favorite.asStateFlow()

    init {
        getFavorites()
    }

    private fun getFavorites() {
        viewModelScope.launch {
            favoriteRepository.getFavorite().collect {
                _favorite.value = it
            }
        }
    }
}