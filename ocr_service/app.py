
# SCANALYZE OCR MICROSERVICE
# Usage: python app.py

from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import os

app = Flask(__name__)

@app.route('/ocr/process', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Load image and perform OCR
        img = Image.open(file.stream)
        # Optional: preprocessing (grayscale, thresholding)
        extracted_text = pytesseract.image_to_string(img)
        
        return jsonify({
            "status": "success",
            "text": extracted_text,
            "metadata": {
                "width": img.width,
                "height": img.height,
                "format": img.format
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
