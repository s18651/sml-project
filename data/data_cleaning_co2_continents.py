import pandas as pd
import os
from sklearn.preprocessing import LabelEncoder
from googletrans import Translator

pd.set_option('display.max_columns', None)

data_file = os.path.join(os.path.join('raw', 'WDI_csv'), 'WDIData.csv')
data_file_countries = os.path.join('raw', 'countryContinent.csv')
cleaned_data_file = os.path.join('cleaned', 'df_continents_co2.csv')
countries_dict = os.path.join('cleaned', 'df_countries_encoding_dict.csv')
countries_dict_pl = os.path.join('cleaned', 'df_countries_encoding_dict_pl.csv')
co2_indicator = 'EN.ATM.NOXE.KT.CE'

regions_mapping = {
    'Africa': 0,
    'Asia': 1,
    'Europe': 2,
    'Oceania': 3,
    'Americas': 4
}

df_data = pd.read_csv(data_file)
df_data_countries = pd.read_csv(data_file_countries, encoding = "ISO-8859-1")
df_data_countries['Region Index'] = df_data_countries['continent'].map(regions_mapping)
df_data_countries.loc[df_data_countries.sub_region == 'South America', ['Region Index']] = 5

useful_columns = ['country', 'continent', 'code_3', 'Region Index']
df_data_countries = pd.DataFrame(df_data_countries, columns=useful_columns)
df_data_countries.rename(columns={'code_3':'Country Code'}, inplace=True)

df_data_countries = df_data_countries[df_data_countries['Region Index'].notna()]
df_data_countries['Region Index'] = df_data_countries['Region Index'].astype(int)

df_co2 = df_data[df_data['Indicator Code'] == co2_indicator]

df_merged = pd.merge(
    left = df_data_countries,
    right = df_co2,
    on = 'Country Code'
)

df_merged['Country Name'] = df_merged['Country Name'].replace('\"', '')

# drop unnecessary columns
columns_to_drop = ['country', 'Country Code', 'Indicator Name', 'Indicator Code']
df_merged.drop(columns=columns_to_drop, inplace=True)
# drop columns where all values are NaN
df_merged.dropna(axis=1, how='all', inplace=True)
# drop rows where most (at least 5) of the columns are not empty
df_merged.dropna(thresh=5, inplace=True)
# to discuss if we need to replace countries codes/names into 0, 1, 2, 3 etc.
# currently I have left Country Name and Region to be able to do human-readible DF
# these columns have to be removed before training
df_merged.rename(columns={'continent': 'Continent'}, inplace=True)

le = LabelEncoder()
encoded_country = le.fit_transform(df_merged['Country Name'])
df_merged['Country Index'] = encoded_country
df_countries_encoded = pd.DataFrame(le.inverse_transform(encoded_country))
df_countries_encoded['Country Index'] = encoded_country

df_merged.fillna(method='ffill', axis=0, inplace=True)

df_countries_encoded.rename(columns={0: 'Country Name'}, inplace=True)

df_merged.to_csv(cleaned_data_file, index=None)
df_countries_encoded.to_csv(countries_dict, index=None)

df_countries_encoded_translated = df_countries_encoded.copy()
translator = Translator()


def translate(x):
    translated = translator.translate(x, dest="pl").text
    print(translated)
    return translated


df_countries_encoded_translated['Country Name'] = df_countries_encoded_translated['Country Name'].apply(lambda x: translate(x))
print(df_countries_encoded_translated)

df_countries_encoded_translated.to_csv(countries_dict_pl, index=None)