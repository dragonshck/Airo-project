package com.example.airobuilder.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.airobuilder.R
import com.example.airobuilder.adapter.ComponentAdapter
import com.example.airobuilder.data.responses.ResultResponse
import com.example.airobuilder.data.responses.SimpleComponent
import com.example.airobuilder.databinding.ActivityOutputBinding
import com.example.airobuilder.viewmodel.PersonalizeViewModel
import com.example.airobuilder.viewmodel.ViewModelFactory
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

class OutputActivity : AppCompatActivity() {
    private var _binding: ActivityOutputBinding? = null
    private val binding get() = _binding

    private var type = ""
    private var price = 0

    private val personalizeViewModel: PersonalizeViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        _binding = ActivityOutputBinding.inflate(layoutInflater)
        setContentView(binding?.root)

        setToolbar(getString(R.string.result))

        type = intent.extras?.getString("type").orEmpty()
        price = intent.extras?.getInt("price") ?: 0

        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                launch {
                    personalizeViewModel.component.collect { result ->
                        showComponent(result)
                    }
                }

                launch {
                    personalizeViewModel.isLoading.collect { loaded ->
                        if (!loaded) showLoading(false)
                        else showLoading(true)
                    }
                }

                launch {
                    personalizeViewModel.getComponents("pc")
                }
            }
        }
    }

    private fun setToolbar(title: String) {
        setSupportActionBar(binding?.toolbar)
        supportActionBar?.apply {
            setDisplayShowHomeEnabled(true)
            setDisplayHomeAsUpEnabled(true)
            this.title = title
        }
    }

    private fun showComponent(result: ResultResponse<ArrayList<SimpleComponent>>) {
        when(result) {
            is ResultResponse.Loading -> {
                showLoading(true)
            }
            is ResultResponse.Error -> {
                showLoading(false)
                errOcc()
            }
            is ResultResponse.Success -> {
                var filtered = listOf<SimpleComponent>()

                if (type == "Gaming") {
                    filtered = result.data.filter { it.isGaming == 1 && it.price <= price }
                } else {
                    filtered = result.data.filter { it.isGaming == 0 && it.price <= price }
                }

                val listComponentAdapter = ComponentAdapter(filtered)

                binding!!.rvListComponent.apply {
                    layoutManager = LinearLayoutManager(this@OutputActivity)
                    adapter = listComponentAdapter
                    setHasFixedSize(true)
                }

                listComponentAdapter.setOnItemClickCallback(object : ComponentAdapter.OnItemClickCallback {
                    override fun onItemClicked(component: SimpleComponent) {
                        toDetailComponent(component)
                    }
                })
                showLoading(false)
                binding?.rvListComponent?.visibility = View.VISIBLE
                binding?.tvType?.text = "Tipe : $type"
            }
        }
    }

    private fun showLoading(isLoading: Boolean) {
        if (isLoading) binding?.pbLoading?.visibility = View.VISIBLE
        else binding?.pbLoading?.visibility = View.GONE
    }

    private fun errOcc() {
        Toast.makeText(this, "An error occurred", Toast.LENGTH_SHORT).show()
        binding?.rvListComponent?.visibility = View.GONE
    }

    private fun toDetailComponent(component: SimpleComponent) {
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