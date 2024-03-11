from sample import sample

from flask import Flask, jsonify

app = Flask(__name__)


@app.get('/generate')
def generate():
    return jsonify(sample(100, " ", 1024))


app.run(debug=True)