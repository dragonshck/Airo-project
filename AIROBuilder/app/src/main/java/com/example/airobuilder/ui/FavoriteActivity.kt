package com.example.airobuilder.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.airobuilder.R
import com.example.airobuilder.adapter.ComponentAdapter
import com.example.airobuilder.data.responses.SimpleComponent
import com.example.airobuilder.data.room.ComponentEntity
import com.example.airobuilder.databinding.ActivityFavoriteBinding
import com.example.airobuilder.viewmodel.FavoriteViewModel
import com.example.airobuilder.viewmodel.ViewModelFactory
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import java.util.ArrayList

class FavoriteActivity : AppCompatActivity() {
    private lateinit var binding: ActivityFavoriteBinding
    private val favoriteViewModel: FavoriteViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityFavoriteBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setToolbar(getString(R.string.favorite))

        lifecycleScope.launchWhenStarted {
            launch {
                favoriteViewModel.favorite.collect {
                    if (it.isNotEmpty()) showFavorite(it)
                    else showInfo()
                }
            }
        }
    }

    private fun setToolbar(title: String) {
        setSupportActionBar(binding.toolbar)
        supportActionBar?.apply {
            setDisplayShowHomeEnabled(true)
            setDisplayHomeAsUpEnabled(true)
            this.title = title
        }
    }

    private fun showInfo() {
        binding.noData.visibility = View.VISIBLE
        binding.rvFav.visibility = View.GONE
    }

    private fun showFavorite(component: List<ComponentEntity>) {
        val list = ArrayList<SimpleComponent>()

        component.forEach { components ->
            val data = SimpleComponent(
                components.id,
                components.model,
                components.photoUrl,
                components.name,
                components.brand,
                0,
                components.price
            )
            list.add(data)
        }

        val componentAdapter = ComponentAdapter(list)

        binding.rvFav.apply {
            layoutManager = LinearLayoutManager(this@FavoriteActivity)
            adapter = componentAdapter
            visibility = View.VISIBLE
            setHasFixedSize(true)
        }

        binding.noData.visibility = View.GONE

        componentAdapter.setOnItemClickCallback(object : ComponentAdapter.OnItemClickCallback {
            override fun onItemClicked(component: SimpleComponent) {
                goToDetailComponent(component)
            }
        })

    }

    private fun goToDetailComponent(component: SimpleComponent) {
        Intent(this, DetailActivity::class.java).apply {
            putExtra(DetailActivity.EXTRA_DATA, component.model)
            putExtra(DetailActivity.EXTRA_ID, component.id)
        }.also {
            startActivity(it)
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()

        return true
    }
}