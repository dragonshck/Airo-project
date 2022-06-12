package com.example.airobuilder.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.example.airobuilder.helper.Utils.Companion.setImageGlide
import com.example.airobuilder.R
import com.example.airobuilder.data.responses.Component
import com.example.airobuilder.data.responses.ResultResponse
import com.example.airobuilder.data.room.ComponentEntity
import com.example.airobuilder.databinding.ActivityDetailBinding
import com.example.airobuilder.viewmodel.DetailViewModel
import com.example.airobuilder.viewmodel.ViewModelFactory
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.collect
import java.text.NumberFormat
import java.util.*

class DetailActivity : AppCompatActivity(), View.OnClickListener {
    private var _binding: ActivityDetailBinding? = null
    private val binding get() = _binding!!

    private var componentDetail: ComponentEntity? = null
    private var isFavorite: Boolean? = null

    private var model: String? = null
    private var id: Int? = null

    private val detailViewModel: DetailViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        _binding = ActivityDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        id = intent.extras?.get(EXTRA_ID) as Int

        setToolbar(getString(R.string.detail))

        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                launch {
                    detailViewModel.componentDetail.collect { result ->
                        onComponentDetail(result)
                    }
                }

                launch {
                    detailViewModel.isFavorite(id!!).collect { state ->
                        isFavorite(state)
                        isFavorite = state
                    }
                }

                launch {
                    detailViewModel.isLoading.collect { loaded ->
                        if (!loaded) detailViewModel.getDetailComponent(id!!)
                    }
                }
            }
        }
        binding.fabFavorite.setOnClickListener(this)
    }

    private fun setToolbar(title: String) {
        setSupportActionBar(binding.toolbar)
        supportActionBar?.apply {
            setDisplayShowHomeEnabled(true)
            setDisplayHomeAsUpEnabled(true)
            this.title = title
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()

        return true
    }

    private fun onComponentDetail(result: ResultResponse<Component>) {
        when (result) {
            is ResultResponse.Loading -> {
                showLoading(true)
            }
            is ResultResponse.Error -> {
                errorOcc()
                showLoading(false)
                Toast.makeText(this, result.error, Toast.LENGTH_SHORT).show()
            }
            is ResultResponse.Success -> {
                result.data.let { component ->
                    parseComponentDetail(component)

                    val componentEntity = ComponentEntity(component.id, component.model, component.name, component.imageUrl, component.brand, true, isGaming = false, component.price)
                    componentDetail = componentEntity
                }
                showLoading(false)
            }
        }
    }

    private fun isFavorite(favorite: Boolean) {
        if (favorite) {
            binding.fabFavorite.setImageResource(R.drawable.ic_baseline_favorite)
        } else {
            binding.fabFavorite.setImageResource(R.drawable.ic_baseline_favorite_border)
        }
    }

    override fun onClick(v: View?) {
        when (v?.id) {
            R.id.fab_favorite -> {
                if (isFavorite == false) {
                    componentDetail?.let {
                        detailViewModel.saveToFavorite(it)
                    }
                    isFavorite(true)
                    Toast.makeText(this, "Berhasil ditambahkan ke favorit", Toast.LENGTH_SHORT).show()
                } else {
                    componentDetail?.let {
                        detailViewModel.deleteFavorite(it)
                    }
                    isFavorite(false)
                    Toast.makeText(this, "Berhasil dihapus dari favorit", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun showLoading(isLoading: Boolean) {
        if (isLoading) {
            binding.apply {
                pbLoading.visibility = View.VISIBLE
                fabFavorite.visibility = View.GONE
            }
        } else {
            binding.apply {
                pbLoading.visibility = View.GONE
                fabFavorite.visibility = View.VISIBLE
            }
        }
    }

    private fun errorOcc() {
        binding.apply {
            binding.detailContainer.visibility = View.INVISIBLE
        }
        Toast.makeText(this, "Terjadi Kesalahan", Toast.LENGTH_SHORT).show()
    }

    private fun parseComponentDetail(component: Component) {
        binding.apply {
            ivComponentImage.setImageGlide(this@DetailActivity, component.imageUrl)
            tvComponentName.text = component.name
            tvComponentPrice.text = formatRupiah(component.price.toDouble())
            tvContent.text = component.description
            tvBrand.text = getString(R.string.brand) + " " + component.brand
        }
    }

    private fun formatRupiah(num: Double) : String {
        val localeID = Locale("in", "ID")
        val formatRupiah = NumberFormat.getCurrencyInstance(localeID)

        return formatRupiah.format(num)
    }

    override fun onDestroy() {
        model = null
        id = null
        isFavorite = null

        super.onDestroy()
    }

    companion object {
        const val EXTRA_DATA = "EXTRA_DATA"
        const val EXTRA_ID = "1"
    }
}