import pandas as pd
import os
from googletrans import Translator
import re

pd.set_option('display.max_columns', None)

data_file = os.path.join(os.path.join('raw', 'WDI_csv'), 'WDISeries.csv')
cleaned_data_file = os.path.join('cleaned', 'df_news.csv')
df = pd.read_csv(data_file)

df_funfacts = df['Development relevance'].drop_duplicates()

string_of_funfacts_pl = ""
translator = Translator()
for text in df_funfacts.values:
    if isinstance(text, str):
        if 100 < len(text) < 500:
            translation = translator.translate(text, dest="pl")
            translation_text = text
            translation_text_r = translation_text.replace('\r', '')
            string_of_funfacts_pl += translation_text_r.strip()

list_of_funfacts_pl = list(filter(None, string_of_funfacts_pl.split('. ')))

for idx, item in enumerate(list_of_funfacts_pl):
    list_of_funfacts_pl[idx] = list_of_funfacts_pl[idx].replace('.', '. ')
    list_of_funfacts_pl[idx] = list_of_funfacts_pl[idx].rstrip()
    if not list_of_funfacts_pl[idx].endswith('.'):
        list_of_funfacts_pl[idx] += '.'
    list_of_funfacts_pl[idx] = list_of_funfacts_pl[idx].replace('  ', ' ')
    if len(list_of_funfacts_pl[idx].strip()) < 5:
        del list_of_funfacts_pl[idx]

with open(cleaned_data_file, "w", encoding="utf-8") as file:
    for text in list_of_funfacts_pl:
        file.write(text.strip().replace('​', '') + "\n")
