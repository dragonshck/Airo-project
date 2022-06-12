package com.example.airobuilder.data.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class ArticleModel(
    var id: Int,
    var title: String,
    var photoUrl: String,
    var content: String
) : Parcelable
