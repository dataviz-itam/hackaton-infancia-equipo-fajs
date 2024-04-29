import pandas as pd

file_path = 'desap_coords.csv'

datos = pd.read_csv(file_path)

grouped_data = datos.groupby(['Municipio ', 'Coordenadas']).size().reset_index(name='conteo')
grouped_data.rename(columns={'Municipio ': 'municipio', 'Coordenadas': 'coord'}, inplace=True)
grouped_data['coord'] = grouped_data['coord'].str.split(',').apply(lambda x: [float(coord) for coord in x])

json_output = grouped_data.to_json(orient='records', force_ascii=False)

output_json_path = 'grouped_data.json'
grouped_data.to_json(output_json_path, orient='records', force_ascii=False)
output_json_path

