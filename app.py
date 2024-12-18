from flask import Flask, jsonify, request
from flask_cors import CORS
GROQ_API_KEY = "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"
import os
from groq import Groq
app = Flask(__name__)
CORS(app)


client = Groq(
    api_key=GROQ_API_KEY,
)

@app.route('/api', methods=['POST'])
def api():
    content = request.json['content']
    print(content)
    chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": content,
                }
            ],
            model="llama3-8b-8192",
        )
    data = {
        'message':chat_completion.choices[0].message.content
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
