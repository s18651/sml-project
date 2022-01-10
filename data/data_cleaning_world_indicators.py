import csv
import os
import pandas as pd
from sklearn.preprocessing import LabelEncoder

pd.set_option('display.max_columns', None)

data_file = os.path.join(os.path.join('raw', 'WDI_csv'), 'WDIData.csv')
data_file_countries = os.path.join(os.path.join('raw', 'WDI_csv'), 'WDICountry.csv')
cleaned_data_file = os.path.join('cleaned', 'df_world_indicators.csv')
co2_indicator = 'EN.ATM.NOXE.KT.CE'
country_indicator = 'World'
destination_year = '2020'

df = pd.read_csv(data_file)

df = df[df['Country Name'] == country_indicator]
df = df.loc[~df[destination_year].isnull()]

df = df.drop(df.columns[-1], axis=1)

le = LabelEncoder()
encoded_indicator = le.fit_transform(df['Indicator Code'])
df['Indicator Index'] = encoded_indicator
list_of_indicators = le.inverse_transform(encoded_indicator)
list_of_encoded_indicators = encoded_indicator
zip_iterator = zip(list_of_indicators, list_of_encoded_indicators)
a_dictionary = dict(zip_iterator)
writer = csv.writer(open(os.path.join('cleaned', 'df_world_indicators_dict.csv'), "w"))
for key, value in a_dictionary.items():
    writer.writerow([key, value])

df = df.drop(columns=['Country Code', 'Country Name', 'Indicator Code', 'Indicator Name'], axis=1)

df_t = pd.DataFrame(df.T)
df_t.columns = df_t.iloc[-1].astype(int)
df_t = df_t.iloc[:-1]
df_t.dropna(inplace=True)

df_t.to_csv(cleaned_data_file)
