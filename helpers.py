import pandas as pd
import numpy as np


# format
# [{'year': 2000, 'emission': 2021312.23}, {'year': 2001, 'emission': 232222323.23}...]
def import_poland_data():
    data = pd.read_csv('data/cleaned/df_poland_co2.csv', index_col=0, header=None).T.values.tolist()
    mapped_data = np.array([])
    index = 0
    for item in data:
        mapped_item = {'year': int(item[0]), 'emission': item[1]}
        mapped_data = np.append(mapped_data, mapped_item)
        index += 1

    return mapped_data.tolist()
