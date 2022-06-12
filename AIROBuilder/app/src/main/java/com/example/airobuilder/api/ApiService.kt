package com.example.airobuilder.api

import com.example.airobuilder.data.responses.*
import retrofit2.http.*

interface ApiService {
    @GET("article")
    suspend fun getArticles(
    ): ArrayList<Article>

    @GET("article/{id}")
    suspend fun  getDetailArticle(
        @Path("id") id: Int
    ) : Article

    @GET("{component}")
    suspend fun searchName(
        @Path("component") component: String
    ): ArrayList<SimpleComponent>

    @GET("pc/model/{model}")
    suspend fun searchByModels(
        @Path("model") model: String
    ): ArrayList<SimpleComponent>

    @GET("pc/{id}")
    suspend fun getDetailComponent(
        @Path("id") id: Int
    ): Component

    @POST("personalize")
    @FormUrlEncoded
    suspend fun uploadPersonalize(
        @Field("message") description: String,
        @Field("price") price: Int
    ): TypeResponse
}