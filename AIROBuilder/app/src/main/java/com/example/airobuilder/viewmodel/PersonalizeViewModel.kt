package com.example.airobuilder.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.airobuilder.data.repository.FavoriteRepository
import com.example.airobuilder.data.responses.ResultResponse
import com.example.airobuilder.data.responses.SimpleComponent
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

class PersonalizeViewModel(private val favoriteRepository: FavoriteRepository) : ViewModel() {
    private val _component = MutableStateFlow<ResultResponse<ArrayList<SimpleComponent>>>(ResultResponse.Loading)
    val component = _component.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading = _isLoading.asStateFlow()

    fun uploadPersona(description: String, price: Int) = favoriteRepository.uploadPersonalize(description, price)

    fun getComponents(component: String) {
        _component.value = ResultResponse.Loading
        viewModelScope.launch {
            favoriteRepository.getComponent(component).collect {
                _component.value = it
            }
        }
        _isLoading.value = false
    }
}