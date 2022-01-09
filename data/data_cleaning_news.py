import pandas as pd
import os
from googletrans import Translator, constants
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
        if len(text) > 10:
            translation = translator.translate(text, dest="pl")
            translation_text = translation.text
            translation_text = translation_text.replace('\r', '')
            string_of_funfacts_pl += re.sub('\n.\)', ' .\)', translation_text.strip())

list_of_funfacts_pl = string_of_funfacts_pl.split('\n')

with open(cleaned_data_file, "w", encoding="utf-8") as file:
    for text in list_of_funfacts_pl:
        file.write(text.replace('​', '') + "\n")
