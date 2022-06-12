package com.example.airobuilder.helper

import android.content.Context
import android.widget.ImageView
import com.bumptech.glide.Glide
import com.example.airobuilder.R
import de.hdodenhof.circleimageview.CircleImageView

class Utils {
    companion object {
        fun ImageView.setImageGlide(context: Context, url: String) {
            Glide
                .with(context)
                .load(url)
                .placeholder(R.drawable.placeholder)
                .into(this)
        }

        fun CircleImageView.setImageGlide(context: Context, url: String) {
            Glide
                .with(context)
                .load(url)
                .placeholder(R.drawable.placeholder)
                .into(this)
        }
    }
}