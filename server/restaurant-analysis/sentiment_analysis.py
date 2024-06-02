import os
from fastai.text.all import load_learner
import sys

def analyze_sentiment(review_text, model_path):
    if not os.path.exists(model_path):
        print(f"Model file not found at: {model_path}", file=sys.stderr)
        return None
    
    try:
        learn = load_learner(model_path)
        
        # Suppress logging and progress bars
        with learn.no_bar(), learn.no_logging():
            prediction = learn.predict(review_text)
            return str(prediction[0])
    except Exception as e:
        print(f"Error predicting sentiment for text: {review_text}, error: {e}", file=sys.stderr)
        return None

if __name__ == '__main__':
    if len(sys.argv) > 1:
        review_text = sys.argv[1]
    else:
        print("Please provide a review text", file=sys.stderr)
        sys.exit(1)

    model_path = os.path.abspath('restaurant-analysis/sentiment_model.pkl')
    sentiment = analyze_sentiment(review_text, model_path)
    if sentiment:
        print(f"Sentiment: {sentiment}")
    else:
        print("Sentiment analysis failed", file=sys.stderr)
