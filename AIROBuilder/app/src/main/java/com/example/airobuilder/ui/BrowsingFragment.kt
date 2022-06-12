package com.example.airobuilder.ui

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.widget.SearchView
import androidx.fragment.app.viewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.airobuilder.adapter.ComponentAdapter
import com.example.airobuilder.data.responses.ResultResponse
import com.example.airobuilder.data.responses.SimpleComponent
import com.example.airobuilder.databinding.FragmentBrowsingBinding
import com.example.airobuilder.ui.DetailActivity.Companion.EXTRA_ID
import com.example.airobuilder.viewmodel.BrowsingViewModel
import com.example.airobuilder.viewmodel.ViewModelFactory
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

class BrowsingFragment : Fragment() {
    private var _binding: FragmentBrowsingBinding? = null
    private val binding get() = _binding!!

    private val browsingViewModel: BrowsingViewModel by viewModels {
        ViewModelFactory.getInstance(requireContext())
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentBrowsingBinding.inflate(layoutInflater)
        searchView()
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                launch {
                    browsingViewModel.component.collect { result ->
                        showSearchResult(result)
                    }
                }
                launch {
                    browsingViewModel.isLoading.collect { loaded ->
                       if (!loaded) showLoading(false)
                       else showLoading(true)
                    }
                }
            }
        }
        return binding.root
    }

    private fun searchView() {
        val searchView = binding.svSearchBar

        searchView.apply {
            setOnQueryTextListener(object : SearchView.OnQueryTextListener {
                override fun onQueryTextSubmit(query: String?): Boolean {
                    browsingViewModel.findByModels(query ?: "")
                    clearFocus()
                    return true
                }

                override fun onQueryTextChange(newText: String?): Boolean {

                    return false
                }
            })
        }
    }

    private fun showSearchResult(result: ResultResponse<ArrayList<SimpleComponent>>) {
        when (result) {
            is ResultResponse.Loading -> {
                showLoading(true)
            }
            is ResultResponse.Error -> {
                errOcc()
                showLoading(false)
            }
            is ResultResponse.Success -> {
                val listComponentAdapter = ComponentAdapter(result.data)

                binding.rvListComponent.apply {
                    layoutManager = LinearLayoutManager(requireContext())
                    adapter = listComponentAdapter
                    setHasFixedSize(true)
                }

                listComponentAdapter.setOnItemClickCallback(object : ComponentAdapter.OnItemClickCallback {
                    override fun onItemClicked(component: SimpleComponent) {
                        toDetailComponent(component)
                    }
                })
                showLoading(false)
                binding.ivSearchForNext.visibility = View.GONE
                binding.tvSearchForNext.visibility = View.GONE
                binding.tvNoFound.visibility = View.GONE
                binding.rvListComponent.visibility = View.VISIBLE
            }
        }
    }

    private fun showLoading(isLoading: Boolean) {
        if (isLoading) binding.pbLoading.visibility = View.VISIBLE
        else binding.pbLoading.visibility = View.GONE
    }

    private fun errOcc() {
        Toast.makeText(requireContext(), "Data tidak ditemukan", Toast.LENGTH_SHORT).show()
        binding.tvNoFound.visibility = View.VISIBLE
        binding.rvListComponent.visibility = View.GONE
    }

    private fun toDetailComponent(component: SimpleComponent) {
        Intent(requireContext(), DetailActivity::class.java).apply {
            putExtra(EXTRA_ID, component.id)
        }.also {
            startActivity(it)
        }
    }

}