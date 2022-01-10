import pandas as pd
import os

pd.set_option('display.max_columns', None)

data_file = os.path.join(os.path.join('raw', 'WDI_csv'), 'WDIData.csv')
data_file_countries = os.path.join('raw', 'countryContinent.csv')
cleaned_data_file = os.path.join('cleaned', 'df_continents_co2_grouped.csv')
cleaned_data_file_grouped = os.path.join('cleaned', 'df_continents_co2_grouped_by_continent.csv')
cleaned_data_file_continents_dict = os.path.join('cleaned', 'df_continents_dict.csv')
co2_indicator = 'EN.ATM.NOXE.KT.CE'

df_data = pd.read_csv(data_file)
df_data_countries = pd.read_csv(data_file_countries, encoding = "ISO-8859-1")

regions_mapping = {
    'Africa': 0,
    'Asia': 1,
    'Europe': 2,
    'Oceania': 3,
    'Americas': 4
}

df_data_countries['Region Index'] = df_data_countries['continent'].map(regions_mapping)

df_data_countries.loc[df_data_countries.sub_region == 'South America', ['Region Index']] = 5

useful_columns = ['country', 'continent', 'code_3', 'Region Index']
df_data_countries = pd.DataFrame(df_data_countries, columns=useful_columns)
df_data_countries.rename(columns={'code_3':'Country Code'}, inplace=True)

df_co2 = df_data[df_data['Indicator Code'] == co2_indicator]
print('Shape of df_co2 is {} and countries {}'.format(df_co2.shape, df_data_countries.shape))
if df_co2.shape[0] < 1:
    raise Exception('CO2 Indicator has not been picked correctly!')

df_merged = pd.merge(
    left = df_data_countries,
    right = df_co2,
    on = 'Country Code'
)

columns_to_remove = ['Unnamed: 65', 'Indicator Name', 'Indicator Code', 'Country Name']
df_merged.drop(columns=columns_to_remove, inplace=True)
df_merged.dropna(axis=1, how='all', inplace=True)
df_merged.dropna(thresh=10, inplace=True)

df_merged.to_csv(cleaned_data_file, index=None)

df_merged.drop(columns=['country', 'continent', 'Country Code'], inplace=True)
df_grouped = df_merged.groupby(['Region Index']).sum()

df_grouped.to_csv(cleaned_data_file_grouped)

final_regions_mapping = {
    'Africa': 0,
    'Asia': 1,
    'Europe': 2,
    'Oceania': 3,
    'North & Central America': 4,
    'South America': 5
}
df_regions_dict = pd.DataFrame(final_regions_mapping, index=[]).T.reset_index()

df_regions_dict.to_csv(cleaned_data_file_continents_dict)

