package com.example.airobuilder.di

import android.content.Context
import com.example.airobuilder.api.ApiConfig
import com.example.airobuilder.data.repository.FavoriteRepository
import com.example.airobuilder.data.room.ComponentDatabase

object Injection {
    fun provideRepo(context: Context): FavoriteRepository {
        val db = ComponentDatabase.getDatabase(context)
        val apiService = ApiConfig.getApiService()
        val componentDao = db.componentDao()

        return FavoriteRepository.getInstance(apiService, componentDao)
    }
}
