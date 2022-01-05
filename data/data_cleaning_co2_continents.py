import pandas as pd
import os
from sklearn.preprocessing import LabelEncoder

pd.set_option('display.max_columns', None)

data_file = os.path.join(os.path.join('raw', 'WDI_csv'), 'WDIData.csv')
data_file_countries = os.path.join(os.path.join('raw', 'WDI_csv'), 'WDICountry.csv')
cleaned_data_file = os.path.join('cleaned', 'df_continents_co2.csv')
co2_indicator = 'EN.ATM.NOXE.KT.CE'

regions_mapping = {
    'Europe & Central Asia': 0,
    'Sub-Saharan Africa': 1,
    'Latin America & Caribbean': 2,
    'East Asia & Pacific': 3,
    'Middle East & North Africa': 4,
    'South Asia': 5,
    'North America': 6
}

df_data = pd.read_csv(data_file)
df_data_countries = pd.read_csv(data_file_countries)

#print(df_data.columns)
#print(df_data_countries.columns)
#print(df_data_countries['Region'].isnull().values)

#print(df_data_countries['Region'].value_counts())

df_data_countries['Region'] = df_data_countries['Region'].map(regions_mapping)

#print(df_data_countries.sample(1))
#print(df_data_countries['Region'].value_counts())

useful_columns = ['Country Code', 'Short Name', 'Region']
df_data_countries_cleaned = df_data_countries[useful_columns]

#print(df_data_countries_cleaned[df_data_countries_cleaned.isna().any(axis=1)])
df_data_countries_cleaned = df_data_countries_cleaned[df_data_countries_cleaned['Region'].notna()]
#print('After dropping values')
#print(df_data_countries_cleaned[df_data_countries_cleaned.isna().any(axis=1)])
df_data_countries_cleaned['Region'] = df_data_countries_cleaned['Region'].astype(int)

df_co2 = df_data[df_data['Indicator Code'] == co2_indicator]
print('Shape of df_co2 is {} and countries {}'.format(df_co2.shape, df_data_countries_cleaned.shape))
if df_co2.shape[0] < 1:
    raise Exception('CO2 Indicator has not been picked correctly!')

df_merged = pd.merge(
    left = df_data_countries_cleaned,
    right = df_co2,
    on = 'Country Code'
)

# drop unnecessary columns
columns_to_drop = ['Country Code', 'Short Name', 'Indicator Name', 'Indicator Code']
df_merged.drop(columns=columns_to_drop, inplace=True)
# drop columns where all values are NaN
df_merged.dropna(axis=1, how='all', inplace=True)
# drop rows where most (at least 5) of the columns are not empty
df_merged.dropna(thresh=5, inplace=True)
# to discuss if we need to replace countries codes/names into 0, 1, 2, 3 etc.
# currently I have left Country Name to be able to do human-readible DF - this collumn has to be removed before training

le = LabelEncoder()
encoded_country = le.fit_transform(df_merged['Country Name'])
df_merged['Country Index'] = encoded_country
print(df_merged.columns)

df_merged.to_csv(cleaned_data_file, index=None)




