package com.example.airobuilder.viewmodel

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.airobuilder.data.repository.FavoriteRepository
import com.example.airobuilder.di.Injection
import java.lang.IllegalArgumentException

class ViewModelFactory(private val favoriteRepository: FavoriteRepository) : ViewModelProvider.NewInstanceFactory() {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return when {
            modelClass.isAssignableFrom(HomeViewModel::class.java) -> {
                HomeViewModel(favoriteRepository) as T
            }
            modelClass.isAssignableFrom(BrowsingViewModel::class.java) -> {
                BrowsingViewModel(favoriteRepository) as T
            }
            modelClass.isAssignableFrom(PersonalizeViewModel::class.java) -> {
                PersonalizeViewModel(favoriteRepository) as T
            }
            modelClass.isAssignableFrom(FavoriteViewModel::class.java) -> {
                FavoriteViewModel(favoriteRepository) as T
            }
            modelClass.isAssignableFrom(DetailViewModel::class.java) -> {
                DetailViewModel(favoriteRepository) as T
            }
            else -> throw IllegalArgumentException("Unknown ViewModel class: ${modelClass.name}")
        }
    }

    companion object {
        private var INSTANCE: ViewModelFactory? = null

        fun getInstance(context: Context): ViewModelFactory {
            return INSTANCE ?: synchronized(this) {
                ViewModelFactory(Injection.provideRepo(context)).also {
                    INSTANCE = it
                }
            }
        }
    }
}