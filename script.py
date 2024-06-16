import pandas as pd

def split_csv(file_path, line_count):
    # Charger le fichier CSV complet dans un DataFrame
    df = pd.read_csv(file_path)
    
    # Calculer le nombre de fichiers nécessaires
    total_rows = df.shape[0]
    number_of_files = (total_rows // line_count) + (total_rows % line_count > 0)
    
    # Diviser et sauvegarder les fichiers
    for i in range(number_of_files):
        start_row = i * line_count
        end_row = start_row + line_count
        df_slice = df.iloc[start_row:end_row]
        df_slice.to_csv(f'{file_path[:-4]}_part_{i+1}.csv', index=False)

    print(f"Le fichier a été divisé en {number_of_files} parties.")

# Usage
split_csv('provisionalSybilList.csv', 400000)  # Modifier avec votre chemin de fichier et le nombre de lignes par fichier
