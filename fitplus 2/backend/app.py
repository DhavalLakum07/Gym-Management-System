# FitPlus Backend - Python Flask
# Basic level - saves contact messages to a JSON file

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allow frontend to talk to backend

# Simple file-based storage (no database needed)
MESSAGES_FILE = 'messages.json'

# ── Helper: read messages from file ─────────────────────
def read_messages():
    if not os.path.exists(MESSAGES_FILE):
        return []
    with open(MESSAGES_FILE, 'r') as f:
        return json.load(f)

# ── Helper: save messages to file ───────────────────────
def save_messages(messages):
    with open(MESSAGES_FILE, 'w') as f:
        json.dump(messages, f, indent=2)

# ── Route: Home ──────────────────────────────────────────
@app.route('/')
def home():
    return jsonify({
        'message': 'FitPlus Backend is running!',
        'admin': 'Lakum Dhaval',
        'phone': '9904755999'
    })

# ── Route: Receive contact form message ─────────────────
@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()

    # Basic validation
    if not data:
        return jsonify({'error': 'No data received'}), 400

    name  = data.get('name', '').strip()
    phone = data.get('phone', '').strip()

    if not name or not phone:
        return jsonify({'error': 'Name and phone are required'}), 400

    # Create message object
    message = {
        'name':      name,
        'phone':     phone,
        'email':     data.get('email', ''),
        'interest':  data.get('interest', 'General'),
        'message':   data.get('message', ''),
        'time':      datetime.now().strftime('%d %b %Y, %I:%M %p')
    }

    # Save to file
    messages = read_messages()
    messages.append(message)
    save_messages(messages)

    print(f"[FitPlus] New message from {name} ({phone})")

    return jsonify({
        'success': True,
        'message': f'Message from {name} saved!'
    })

# ── Route: Get all messages (for admin dashboard) ────────
@app.route('/api/messages', methods=['GET'])
def get_messages():
    messages = read_messages()
    return jsonify({
        'success':  True,
        'count':    len(messages),
        'messages': messages
    })

# ── Route: Delete all messages ────────────────────────────
@app.route('/api/messages/clear', methods=['DELETE'])
def clear_messages():
    save_messages([])
    return jsonify({'success': True, 'message': 'All messages cleared'})

# ── Run the server ────────────────────────────────────────
if __name__ == '__main__':
    print("=" * 40)
    print("  FitPlus Backend Running!")
    print("  Admin: Lakum Dhaval")
    print("  URL:   http://localhost:5001")
    print("=" * 40)
    app.run(port=5001, debug=True)
