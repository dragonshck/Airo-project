package com.example.airobuilder.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.airobuilder.data.responses.Article
import com.example.airobuilder.databinding.ArticleListBinding

class ArticleAdapter(private val listArticle: List<Article>) : RecyclerView.Adapter<ArticleAdapter.ListViewHolder>() {
    private lateinit var onItemClickCallback: OnItemClickCallback

    fun setOnItemClickCallback(onItemClickCallback: OnItemClickCallback) {
        this.onItemClickCallback = onItemClickCallback
    }

    class ListViewHolder(var binding: ArticleListBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ListViewHolder {
        val binding = ArticleListBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ListViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ListViewHolder, position: Int) {
        val article = listArticle[position]

        holder.binding.apply {
            Glide.with(ivThumbnail.context)
                .load(article.photoUrl)
                .centerCrop()
                .into(ivThumbnail)
            tvTitle.text = article.title
            tvContent.text = article.content
        }

        holder.itemView.setOnClickListener {
            onItemClickCallback.onItemClicked(article)
        }
    }

    override fun getItemCount(): Int = listArticle.size

    interface OnItemClickCallback {
        fun onItemClicked(article: Article)
    }
}