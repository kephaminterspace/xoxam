# -*- coding: utf-8 -*-
import sys
reload(sys)
sys.setdefaultencoding("utf-8")
from flask import Flask, Blueprint, request, render_template, url_for, send_from_directory
import logging
import datetime
import requests
import urllib
import json
import uuid

from .forms import BankForm
from .utils import *

logger = logging.getLogger(__name__)
app = Flask(__name__, template_folder="templates", static_folder="statics")
#app.config.from_object("at.config")
app.secret_key = 'xoaxamfajdslkf'

@app.route('/robots.txt')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])

@app.route("/", methods=['POST', 'GET'])
def index():
    form = BankForm()

    if request.method == 'POST':
        if form.validate_on_submit():
            data = {
                "properties": [
                    {"property": "identifier", "value":'xoaxam_'+str(uuid.uuid4())},
                    {"property": "firstname", "value":form.name.data},
                    {"property": "lastname", "value":""},
                    {"property": "email", "value":form.email.data},
                    {"property": "phone", "value":form.phone.data},
                    {"property": "address", "value": form.address.data},
                    {"property": "hs_lead_status", "value":"NEW"},
                    {"property": "at_check", "value": "NEW_STATUS"},
                    {"property": "bn_check", "value": "NEW_STATUS"},
                    {"property": "nd_tuvan", "value": form.nd_tuvan.data},
                    {"property": "aff_source", "value":form.aff_source.data},
                    {"property": "aff_sid", "value":form.aff_sid.data},
                ]
            }

            url = "https://api.hubapi.com/contacts/v1/contact/?hapikey=7c68a0fa-4862-4b36-bdf4-a8e6dd9964b4"
            header = {'Content-Type': 'application/json'}
            print json.dumps(data)
            res = requests.post(url=url, data=json.dumps(data), headers=header)
            res_json = res.json()

            if res_json:
                if "status" in res_json and res_json["status"] == "error":
                    if "error" in res_json and res_json["error"] == "CONTACT_EXISTS":
                        form.email.errors.append(u"Email đã tồn tại")
                    else:
                        form.email.errors.append(res_json["message"])

                    return render_template('index.html', form=form)
                else:
                    return render_template('thankyou.html')

            form.email.errors.append("Invalid data!")
            return render_template('index.html', form=form)

        else:
            return render_template('index.html', form=form)

    return render_template('index.html', form=form)


