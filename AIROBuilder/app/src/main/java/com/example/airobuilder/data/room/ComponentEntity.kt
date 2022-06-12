package com.example.airobuilder.data.room

import android.os.Parcelable
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.parcelize.Parcelize

@Entity(tableName = "component", primaryKeys = ["model", "id"])

@Parcelize
data class ComponentEntity(
    @ColumnInfo(name = "id")
    var id: Int,

    @ColumnInfo(name ="model")
    var model: String,

    @ColumnInfo(name = "name")
    var name: String,

    @ColumnInfo(name = "image_url")
    var photoUrl: String,

    @ColumnInfo(name = "brand")
    var brand: String,

    @ColumnInfo(name = "favorite")
    var isFavorite: Boolean,

    @ColumnInfo(name = "gaming")
    var isGaming: Boolean,

    @ColumnInfo(name = "price")
    var price: Int

) : Parcelable