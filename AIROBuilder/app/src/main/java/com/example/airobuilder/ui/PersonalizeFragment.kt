package com.example.airobuilder.ui

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.viewModels
import com.example.airobuilder.R
import com.example.airobuilder.data.responses.ResultResponse
import com.example.airobuilder.databinding.FragmentPersonalizeBinding

import com.example.airobuilder.viewmodel.PersonalizeViewModel
import com.example.airobuilder.viewmodel.ViewModelFactory

class PersonalizeFragment : Fragment() {
    private lateinit var binding: FragmentPersonalizeBinding

    private val personalizeViewModel:PersonalizeViewModel by viewModels {
        ViewModelFactory.getInstance(requireContext())
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View{
        binding = FragmentPersonalizeBinding.inflate(inflater, container, false)

        initAction()

        return binding.root
    }

    private fun initAction() {
        binding.btnSubmit.setOnClickListener {
            uploadPersona()
        }
    }

    override fun onResume() {
        super.onResume()

        val prices = resources.getStringArray(R.array.price)
        val arrayAdapter = ArrayAdapter(requireContext(), R.layout.dropdown_items, prices)
        binding.autoCompleteTextView.setAdapter(arrayAdapter)
    }

    private fun showAlertDialog(param: Boolean, message: String, type: String) {
        if (param) {
            AlertDialog.Builder(requireContext()).apply {
                setTitle(getString(R.string.information_))
                setMessage(getString(R.string.upload_success))
                setPositiveButton(getString(R.string.continue_)) { _, _ ->
                    val intent = Intent(context, OutputActivity::class.java)
                    intent.putExtra("type", type)
                    intent.putExtra("price", binding.dropdownMenu.editText?.text.toString().toInt())
                    startActivity(intent)
                }
                create()
                show()
            }
        } else {
            AlertDialog.Builder(requireContext()).apply {
                setTitle(getString(R.string.information))
                setMessage(getString(R.string.upload_failed) + ", $message")
                setPositiveButton(getString(R.string.continue_)) { _, _ ->
                    binding.pbLoading.visibility = View.GONE
                }
                create()
                show()
            }
        }
    }

    private fun uploadPersona() {
        val description = binding.etField1.text
        val price = binding.dropdownMenu.editText?.text

        when {
            description.isBlank() -> {
                binding.etField1.requestFocus()
                binding.etField1.error = "Deskripsi tidak boleh kosong"
            }
            price?.isEmpty() == true -> {
                binding.dropdownMenu.requestFocus()
                binding.dropdownMenu.error = "Harga tidak boleh kosong"
            }
            else -> {
                val descMediaType = description.toString().trim()
                val priceMedia = price.toString().toInt()

                personalizeViewModel.uploadPersona(descMediaType, priceMedia).observe(requireActivity()) {
                    if (it != null) {
                        when (it) {
                            is ResultResponse.Loading -> {
                                binding.pbLoading.visibility = View.VISIBLE
                            }
                            is ResultResponse.Error -> {
                                binding.pbLoading.visibility = View.GONE
                                showAlertDialog(true, it.error, "")
                            }
                            is ResultResponse.Success -> {
                                binding.pbLoading.visibility = View.GONE
                                showAlertDialog(true, getString(R.string.upload_success), it.data.type)
                            }
                        }
                    }
                }
            }
        }
    }
}