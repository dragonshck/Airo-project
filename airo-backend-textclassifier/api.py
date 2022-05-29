# Function to load the model to predict the user input from the app 

import tensorflow as tf
import string
import time
import pandas as pd
import numpy as np
import json
import matplotlib.pyplot as plt
from tensorflow import keras
from collections import Counter
from keras.preprocessing.text import Tokenizer, tokenizer_from_json
from keras_preprocessing.sequence import pad_sequences
from keras.models import load_model, model_from_json

#Unused Words (Not Specific)
unused =  ['saya', 'mau', 'ingin', 'aku', 'suka', 'beli', 'sangat', 'menginginkan', 'cari', 'pc', 'komputer', 'untuk', 'jadi', 'mencari', 'membuat', 'membutuhkan', 'butuh', 'find', 'search', 'i', 'want',
 'need', 'buy', 'computers', 'computer', 'melakukan', 'do', 'looking', 'again', 'digunakan', 'to', 'a', 'my', 'mirip', 'yang', 'digunakan', 'menggunakan', 'menggunakan', 'buat', 'adalah', 'bisa', 'for', 'can', 'dapat', 'by', 'by', 'create', 'pembuatan', 'at', 'di', 'mengerjakan', 'membutuhhkan', 'mendambakan', 'memberikan', 'membantu', 'rekomendasi', 'isnt', 'are', 'is', 'a', 'about', 'above', 'after', 'again', 'against', 'ain', 'all', 'am', 'an', 'and', 'any', 'are', 'aren', "aren't", 'as', 'at', 'be', 'because', 'been', 'before',
 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'couldn', "couldn't", 'd', 'did', 'didn', "didn't", 'do', 'does', 'doesn', "doesn't", 'doing', 'don', "don't", 'down', 'during', 'each',
 'few', 'for', 'from', 'further', 'had', 'hadn', "hadn't", 'has', 'hasn', "hasn't", 'have', 'haven', "haven't", 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'isn', "isn't", 'it', "it's", 'its', 'itself', 'just', 'll', 'm', 'ma',
 'me', 'mightn', "mightn't", 'more', 'most', 'mustn', "mustn't", 'my', 'myself', 'needn', "needn't", 'no','nor', 'not', 'now', 'o', 'of', 'off',
 'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 're', 's', 'same', 'shan', "shan't", 'she', "she's", 'should', "should've", 'shouldn', "shouldn't", 'so', 'some', 'such', 't', 'than', 'that',
 "that'll", 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 've', 'very', 'was', 'wasn',
 "wasn't", 'we', 'were', 'weren', "weren't", 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'won', "won't", 'wouldn', "wouldn't", 'y', 'you', "you'd", "you'll", "you're", "you've", 'your', 'yours', 'yourself',
 'yourselves', 'on', 'dan', 'dan', 'e', 'u', 'o', 'nya', 'ini', 'sama', 'dengan', 'sambil', 'dibuat'
]

#To Delete the Unused Words for the Training (Not Specific Enough)
def kata_unused(user_input):
    filtered = [kata.lower() for kata in user_input.split() if kata.lower() not in unused]
    return " ".join(filtered)

#To Delete the Punctuation
def tanda_baca(user_input):
    delta = str.maketrans("", "", string.punctuation)
    return user_input.translate(delta)

#Read The Dataset to Get the Tokenizer and Word Index
alpha = pd.read_csv(r'airo_train.csv')
alpha["text"] = alpha.text.map(tanda_baca)
alpha["text"] = alpha.text.map(kata_unused)

#Splitting as the Model
size = int(alpha.shape[0] * 0.8)
training = alpha[:size]
train_text = training.text.to_numpy()

#Create Tokenizer
oovtoken = "<OOV>"
num = 1000
tokenizer = Tokenizer(num_words=num, oov_token=oovtoken)
tokenizer.fit_on_texts(train_text)

def predict(user_input):
    maxl = 20
    padding = "post"
    trunc = "post"
    
    #Load the model.json and the weight (.h5)
    json = open('model.json','r')
    load = json.read()
    json.close()

    load_model = model_from_json(load)
    load_model.load_weights('model.h5')

    #Pre-Process The Text
    user_input = tanda_baca(user_input)
    user_input = kata_unused(user_input)
    user_input = user_input.split(" ")

    x_sequence = tokenizer.texts_to_sequences(user_input)
    x_pad = pad_sequences(x_sequence, maxlen=maxl, padding=padding, truncating=trunc)
    x_pred = load_model.predict(x_pad)
    
    # This variable shows the average score of the prediction
    result = sum(x_pred)/len(x_pred)
    
    # We chose 51% as the bare minimum that determine between the needed pc components category (Gaming or Non-Gaming)
    label = "Gaming" if result > 0.51 else "Non-Gaming"

    return label
    

