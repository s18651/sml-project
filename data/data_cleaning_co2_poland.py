import pandas as pd
import os

pd.options.mode.chained_assignment = None  # default='warn'

data_file = os.path.join(os.path.join('raw', 'WDI_csv'), 'WDIData.csv')
cleaned_data_file = os.path.join('cleaned', 'df_poland_co2.csv')
co2_indicator = 'EN.ATM.NOXE.KT.CE'

df = pd.read_csv(data_file)

df_poland = df[df['Country Name'] == 'Poland']
if (df_poland.nunique()[0] != 1) or (df_poland.nunique()[1] != 1):
    raise Exception('Poland extraction went wrong!')

df_poland_co2 = df_poland[df_poland['Indicator Code'] == co2_indicator]
if df_poland_co2.shape[0] != 1:
    raise Exception('CO2 Indicator has not been picked correctly!')

print('We can start cleaning')

df_poland_co2.dropna(axis=1, inplace=True)

columns_to_drop = ['Country Name', 'Country Code', 'Indicator Name', 'Indicator Code']
df_poland_co2.drop(columns_to_drop, axis=1, inplace=True)
if df_poland_co2.shape[1] < 1:
    raise Exception('Data has not enough columns (0)!')

print(df_poland_co2)

df_poland_co2.to_csv(cleaned_data_file, index=None)

