from flask import Flask, request, jsonify
import pyotp
import requests

app = Flask(__name__)
# Har user ke liye secret key (Aap isse database mein save kar sakte hain)
totp = pyotp.TOTP("JAI_SHARMA_SECRET_KEY") 

@app.route('/send_otp', methods=['POST'])
def send_otp():
    number = request.json.get('number')
    otp = totp.now() # 6-digit dynamic OTP banega
    
    # Textbelt API se SMS bhejna
    resp = requests.post('https://textbelt.com/text', {
        'phone': number,
        'message': f'PathshalaX OTP: {otp}',
        'key': 'textbelt', # Free key
    })
    return jsonify(resp.json())

@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    user_otp = request.json.get('otp')
    if totp.verify(user_otp):
        return jsonify({"status": "success", "message": "OTP Verified!"})
    else:
        return jsonify({"status": "error", "message": "Invalid OTP!"})

if __name__ == '__main__':
    app.run(port=5000)

