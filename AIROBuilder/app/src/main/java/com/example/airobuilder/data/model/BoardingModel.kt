package com.example.airobuilder.data.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class BoardingModel(
    val img: Int,
    val title: String,
    val description: String,
) : Parcelable
