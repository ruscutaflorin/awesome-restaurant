import pandas as pd
from fastai.text.all import *

def train_model():
    # Sample dataset for demonstration with Romanian text without diacritics
    data = {
        'reviewText': [
            'Acest restaurant este uimitor! Mancarea si serviciile sunt excelente.',
            'Experienta groaznica, mancarea a fost proasta.',
            'Mi-a placut ambianta si personalul a fost prietenos.',
            'Mancarea a fost ok, dar serviciul a fost lent.',
            'Cel mai bun loc! Voi reveni cu siguranta.',
            'Serviciul a fost foarte lent, dar mancarea a fost buna.',
            'Nu mi-a placut deloc, mancarea a fost rece.',
            'Atmosfera a fost foarte placuta, iar mancarea delicioasa.',
            'Serviciul a fost excelent, dar mancarea a fost mediocra.',
            'Un loc frumos, dar prea aglomerat.',
            'Mancarea a fost excelenta, dar preturile sunt cam mari.'
        ],
        'rating': [5, 1, 5, 3, 5, 3, 2, 5, 4, 3, 4]
    }

    df = pd.DataFrame(data)
    print("Dataset:")
    print(df)

    # Check for missing values
    if df.isnull().values.any():
        print("Warning: Dataset contains missing values")

    # Prepare the data for training
    try:
        dls = TextDataLoaders.from_df(df, text_col='reviewText', label_col='rating', is_lm=False, bs=5)
        print("DataLoaders created successfully")
    except Exception as e:
        print(f"Error creating DataLoaders: {e}")
        return

    # Verify data loading
    try:
        print("Training batch example:")
        print(dls.train.show_batch(max_n=5))
        print("Validation batch example:")
        print(dls.valid.show_batch(max_n=5))
    except Exception as e:
        print(f"Error showing batch: {e}")
        return

    # Create a text classifier learner
    try:
        learn = text_classifier_learner(dls, AWD_LSTM, drop_mult=0.5, metrics=accuracy)
        print("Learner created successfully")
    except Exception as e:
        print(f"Error creating learner: {e}")
        return

    # Train the model
    try:
        learn.fine_tune(4)
        print("Model trained successfully")
    except Exception as e:
        print(f"Error during training: {e}")
        return

    # Save the trained model
    try:
        learn.export('sentiment_model.pkl')
        print("Model exported successfully")
    except Exception as e:
        print(f"Error exporting model: {e}")

if __name__ == '__main__':
    import logging
    logging.disable(logging.CRITICAL)  # Disable all logging
    train_model()
