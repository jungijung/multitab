import RPi.GPIO as GPIO
import time
import requests
import subprocess

# GPIO 핀 번호 설정
VIBRATION_PIN = 23

# 진동 횟수 초기화
vibration_count = 0

# 진동 감지 시간 간격 (초)
RESET_INTERVAL = 5

# GPIO 초기화
GPIO.setmode(GPIO.BCM)
GPIO.setup(VIBRATION_PIN, GPIO.IN)

# 진동 감지 이벤트 핸들러
def vibration_detected(channel):
    global vibration_count
    vibration_count += 1
    print(f"진동 감지! 현재 진동 횟수: {vibration_count}")

    # 진동 횟수가 50회 이상인 경우 서버로 전송
    if vibration_count >= 50:
        send_data_to_server()
        time.sleep(10) 
        # 진동 횟수 초기화

# shell script 데이터 전송
def send_data_to_server():
    subprocess.run("./kakaotalk.sh",shell=True)
    subprocess.run("./server.sh",shell=True)

    
# 진동 횟수 초기화
def reset_vibration_count():
    global vibration_count
    vibration_count = 0
    print("진동 횟수 초기화!")

# 진동 감지 이벤트 설정
GPIO.add_event_detect(VIBRATION_PIN, GPIO.RISING, callback=vibration_detected)

# 프로그램 실행
try:
    while True:
        time.sleep(RESET_INTERVAL)  # 3초 대기
        reset_vibration_count()     # 진동 횟수 초기화

except KeyboardInterrupt:
    # Ctrl+C가 입력되면 예외 발생하여 프로그램 종료
    GPIO.cleanup()
