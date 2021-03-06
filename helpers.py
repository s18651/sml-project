import pandas as pd
import numpy as np


# format
# [{'year': 2000, 'emission': 2021312.23}, {'year': 2001, 'emission': 232222323.23}...]
def poland_raw_data():
    data = pd.read_csv('data/cleaned/df_poland_co2.csv', index_col=0, header=None).T.values.tolist()
    mapped_data = np.array([])
    index = 0
    for item in data:
        mapped_item = {'year': int(item[0]), 'emission': item[1]}
        mapped_data = np.append(mapped_data, mapped_item)
        index += 1

    return mapped_data.tolist()

def continents_raw_data(continentId):
    data = pd.read_csv('data/cleaned/df_continents_co2_grouped_by_continent.csv', index_col=0, header=None).T
    continent_values = data[continentId+'.0']
    years = data['Region Index']
    mapped_data = np.array([])
    for countryValue, year in zip(continent_values, years):
        mapped_item = {'year': int(year), 'emission': countryValue}
        mapped_data = np.append(mapped_data, mapped_item)

    return mapped_data.tolist()

def countries_raw_data(countryId):
    data = pd.read_csv('data/cleaned/df_continents_co2.csv', index_col=46, header=None).T
    country_values = data[countryId][3:]
    years = data['Country Index'][3:]
    mapped_data = np.array([])
    for countryValue, year in zip(country_values, years):
        mapped_item = {'year': int(year), 'emission': countryValue}
        mapped_data = np.append(mapped_data, mapped_item)

    return mapped_data.tolist()
