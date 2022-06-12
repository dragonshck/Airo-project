package com.example.airobuilder.data.responses

import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName

data class Article(
    @PrimaryKey
    @field:SerializedName("article_id")
    val id: Int,

    @field:SerializedName("title")
    val title: String,

    @field:SerializedName("image_url")
    val photoUrl:  String,

    @field:SerializedName("content")
    val content: String
)

data class Component(
    @PrimaryKey
    @field:SerializedName("id")
    val id: Int,

    @field:SerializedName("model")
    val model: String,

    @field:SerializedName("image_url")
    val imageUrl: String,

    @field:SerializedName("name")
    val name: String,

    @field:SerializedName("price_idr")
    val price: Int,

    @field:SerializedName("brand")
    val brand: String,

    @field:SerializedName("description")
    val description: String,

    @field:SerializedName("is_gaming")
    val isGaming: Int
)

data class SimpleComponent(
    @field:SerializedName("id")
    val id: Int,

    @field:SerializedName("model")
    val model: String,

    @field:SerializedName("image_url")
    val imageUrl: String,

    @field:SerializedName("name")
    val name: String,

    @field:SerializedName("brand")
    val brand: String,

    @field:SerializedName("is_gaming")
    val isGaming: Int,

    @field:SerializedName("price_idr")
    val price: Int,
)

data class TypeResponse(
    @field:SerializedName("Type")
    val type: String
)
