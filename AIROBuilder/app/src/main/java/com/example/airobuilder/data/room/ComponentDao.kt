package com.example.airobuilder.data.room

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface ComponentDao {
    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun insert(componentEntity: ComponentEntity)

    @Query("SELECT * FROM component ORDER BY id ASC")
    fun getComponent() : Flow<List<ComponentEntity>>

    @Query("SELECT EXISTS(SELECT * FROM component WHERE id = :id AND favorite = 1)")
    fun favoriteComponent(id: Int): Flow<Boolean>

    @Delete
    suspend fun deleteComponent(componentEntity: ComponentEntity)
}