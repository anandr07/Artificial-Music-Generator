from sample import sample
import json

from flask import Flask, jsonify, Response

app = Flask(__name__)


@app.get('/generate')
def generate():
    sam =sample(100, " ", 1500)
    response = Response(sam)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(sam)
    return response


app.run(debug=True)