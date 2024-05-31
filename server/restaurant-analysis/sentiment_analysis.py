import os
import requests
import pandas as pd
from fastai.text.all import load_learner, Learner
import sys
import json

def fetch_reviews(restaurant_id):
    url = f'http://localhost:8000/api/restaurants/reviews/{restaurant_id}'
    response = requests.get(url)
    if response.status_code == 200:
        reviews = response.json()
        return pd.DataFrame(reviews)
    else:
        raise Exception(f"Error fetching reviews: {response.status_code}")

def analyze_sentiment(reviews_df, model_path):
    if not os.path.exists(model_path):
        print(f"Model file not found at: {model_path}", file=sys.stderr)
        return reviews_df
    
    try:
        learn = load_learner(model_path)
        
        # Suppress logging and progress bars
        with learn.no_bar(), learn.no_logging():
            def predict_sentiment(text):
                try:
                    prediction = learn.predict(text)
                    return str(prediction[0])
                except Exception as e:
                    print(f"Error predicting sentiment for text: {text}, error: {e}", file=sys.stderr)
                    return None

            reviews_df['sentiment'] = reviews_df['reviewText'].apply(predict_sentiment)
    except Exception as e:
        print(f"Error loading the model: {e}", file=sys.stderr)
    
    return reviews_df

def main(restaurant_id):
    try:
        reviews_df = fetch_reviews(restaurant_id)
        model_path = os.path.abspath('restaurant-analysis/sentiment_model.pkl')
        analyzed_reviews = analyze_sentiment(reviews_df, model_path)
        json_output = json.dumps(analyzed_reviews.to_dict(orient='records'), ensure_ascii=False, indent=2)
        print(json_output)
    except Exception as e:
        print(f"Error in main function: {e}", file=sys.stderr)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        restaurant_id = int(sys.argv[1])
    else:
        print("Please provide a restaurant ID", file=sys.stderr)
        sys.exit(1)
    
    main(restaurant_id)
