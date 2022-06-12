package com.example.airobuilder.data.repository

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.liveData
import com.example.airobuilder.api.ApiClientPersonalize
import com.example.airobuilder.api.ApiService
import com.example.airobuilder.data.responses.*
import com.example.airobuilder.data.room.ComponentDao
import com.example.airobuilder.data.room.ComponentEntity
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

class FavoriteRepository private constructor(private val apiService: ApiService, private val componentDao: ComponentDao) {
    companion object  {
        private val TAG = FavoriteRepository::class.java.simpleName
        private var INSTANCE: FavoriteRepository? = null

        fun getInstance(apiService: ApiService, componentDao: ComponentDao): FavoriteRepository {
            return INSTANCE ?: synchronized(this) {
                FavoriteRepository(apiService, componentDao).also {
                    INSTANCE = it
                }
            }
        }
    }

    fun getComponentDetail(id: Int): Flow<ResultResponse<Component>> = flow {
        emit(ResultResponse.Loading)

        try {
            val component = apiService.getDetailComponent(id)
            emit(ResultResponse.Success(component))
        } catch (e: Exception) {
            Log.d(TAG, e.message.toString())
            emit(ResultResponse.Error(e.message.toString()))
        }
    }

    fun getArticleDetail(id: Int): Flow<ResultResponse<Article>> = flow {
        emit(ResultResponse.Loading)

        try {
            val article = apiService.getDetailArticle(id)
            emit(ResultResponse.Success(article))
        } catch (e: Exception) {
            Log.d(TAG, e.message.toString())
            emit(ResultResponse.Error(e.message.toString()))
        }
    }

    fun getArticle(): Flow<ResultResponse<ArrayList<Article>>> = flow {
        emit(ResultResponse.Loading)

        try {
            val article = apiService.getArticles()
            emit(ResultResponse.Success(article))
        } catch (e: Exception) {
            Log.d(TAG, e.message.toString())
            emit(ResultResponse.Error(e.message.toString()))
        }
    }

    fun findByModel(query: String): Flow<ResultResponse<ArrayList<SimpleComponent>>> = flow {
        emit(ResultResponse.Loading)

        try {
            val component = apiService.searchByModels(query)
            emit(ResultResponse.Success(component))
        } catch (e: Exception) {
            Log.d(TAG, e.message.toString())
            emit(ResultResponse.Error(e.message.toString()))
        }
    }

    fun getComponent(component: String): Flow<ResultResponse<ArrayList<SimpleComponent>>> = flow {
        emit(ResultResponse.Loading)

        try {
            val components = apiService.searchName(component)
            emit(ResultResponse.Success(components))
        } catch (e: Exception) {
            Log.d(TAG, e.message.toString())
            emit(ResultResponse.Error(e.message.toString()))
        }
    }

    fun uploadPersonalize(description: String, price: Int): LiveData<ResultResponse<TypeResponse>> = liveData {
        emit(ResultResponse.Loading)

        try {
            val response = ApiClientPersonalize.getApiService().uploadPersonalize(description, price)
                emit(ResultResponse.Success(response))

        } catch (e: Exception) {
            Log.e(TAG, "Exception: ${e.message.toString()} ")
            emit(ResultResponse.Error(e.message.toString()))
        }
    }

    fun isFavorite(id: Int): Flow<Boolean> {
        return componentDao.favoriteComponent(id)
    }

    fun getFavorite(): Flow<List<ComponentEntity>> {
        return componentDao.getComponent()
    }

    suspend fun saveFavorite(component: ComponentEntity) {
        componentDao.insert(component)
    }

    suspend fun deleteFavorite(component: ComponentEntity)  {
        componentDao.deleteComponent(component)
    }
}