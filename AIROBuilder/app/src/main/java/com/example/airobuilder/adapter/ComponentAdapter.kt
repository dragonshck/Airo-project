package com.example.airobuilder.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.airobuilder.data.responses.SimpleComponent
import com.example.airobuilder.databinding.ComponentListBinding
import com.example.airobuilder.helper.Utils.Companion.setImageGlide

class ComponentAdapter(private val listComponent: List<SimpleComponent>) : RecyclerView.Adapter<ComponentAdapter.ListViewHolder>() {
    private lateinit var onItemClickCallback: OnItemClickCallback

    fun setOnItemClickCallback(onItemClickCallback: OnItemClickCallback) {
        this.onItemClickCallback = onItemClickCallback
    }

    class ListViewHolder(var binding: ComponentListBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ListViewHolder {
        val binding = ComponentListBinding.inflate(LayoutInflater.from(parent.context), parent, false)

        return ListViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ListViewHolder, position: Int) {
        val component = listComponent[position]

        holder.binding.apply {
            ivThumbnailComponent.setImageGlide(holder.itemView.context, component.imageUrl)
            tvName.text = component.name
            tvBrand.text = component.brand
            tvModel.text = component.model
        }

        holder.itemView.setOnClickListener {
            onItemClickCallback.onItemClicked(component)
        }
    }

    override fun getItemCount(): Int = listComponent.size

    interface OnItemClickCallback {
        fun onItemClicked(component: SimpleComponent)
    }
}