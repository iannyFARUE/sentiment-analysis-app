# sentiment-analysis-app

A sentiment analysis application with a model build using IMDb movie reviews

## Running App

1. Create a virtual environment `python -m venv .venv`
2. Activate virtual environment `source .venv/bin/activate`
3. Upgrade pip `python -m pip install --upgrade pip`
4. Add .gitignote `echo "*" > .venv/.gitignore`
5. Install the necessary dependencies in **requirements.txt** file `pip install -r requirements.txt`
6. Run the **Sentiment Analysis Model.ipynb** to create the pipeline on your filesystem
7. Start the Fastapi backend by running `fastapi dev main.py`
