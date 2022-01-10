import kaggle
import os

dataset = 'manchunhui/world-development-indicators'
dataset_country2continents = 'statchaitya/country-to-continent'
raw_data_folder = '../data/raw'
number_of_raw_data_files = 0

for dirname, _, filenames in os.walk(raw_data_folder):
    for filename in filenames:
        print(os.path.join(dirname, filename))
        number_of_raw_data_files += 1

# do not download files if they are already there
if number_of_raw_data_files < 1:
    kaggle.api.authenticate()
    kaggle.api.dataset_download_files(dataset, path=raw_data_folder, unzip=True)

    # remove unnecessary files
    os.remove(os.path.join(raw_data_folder, 'WDIData_T.csv'))
    os.remove(os.path.join(raw_data_folder, 'WDIrevisions.xls'))

kaggle.api.authenticate()
kaggle.api.dataset_download_files(dataset_country2continents, path=raw_data_folder, unzip=True)


