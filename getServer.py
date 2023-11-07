import requests
import time
import subprocess

def read_json_value():
    url = 'http://43.201.97.58:3000/pi'
    cnt=1
    while True:
        response = requests.get(url)
        data = response.json()
        stat = data.get("stat")
        if cnt<=30:
             if stat == "wait":
                 cnt+=1
                 time.sleep(1)
                 
             elif stat == "start": 
                subprocess.run("./motercode.sh",shell=True)
                break
             elif stat == "stop":
                 break
        elif cnt>=31:
            subprocess.run("./motercode.sh",shell=True)
            break

def change_json_value() :
    url = 'http://43.201.97.58:3000/pi'
    payload = {"stat":"wait"}

    response = requests.post(url,json=payload)


read_json_value()
time.sleep(1)
change_json_value()
