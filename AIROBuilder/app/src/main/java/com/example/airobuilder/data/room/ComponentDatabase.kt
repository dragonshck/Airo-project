package com.example.airobuilder.data.room

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = [ComponentEntity::class], version = 2, exportSchema = false)
abstract class ComponentDatabase : RoomDatabase() {
    abstract fun componentDao(): ComponentDao

    companion object {
        @Volatile
        private var INSTANCE: ComponentDatabase? = null

        @JvmStatic
        fun getDatabase(context: Context): ComponentDatabase {
            if (INSTANCE == null) {
                synchronized(ComponentDatabase::class.java) {
                    INSTANCE = Room.databaseBuilder(
                        context.applicationContext,
                        ComponentDatabase::class.java, "favorite"
                    )
                        .build()
                }
            }
            return INSTANCE as ComponentDatabase
        }
    }
}