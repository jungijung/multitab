import RPi.GPIO as GPIO
import time

# GPIO 핀 번호 설정
IN1 = 17
IN2 = 27

# GPIO 초기화
GPIO.setmode(GPIO.BCM)
GPIO.setup(IN1, GPIO.OUT)
GPIO.setup(IN2, GPIO.OUT)

# 리니어 모터 제어 함수
def control_linear_motor(direction, duration):
    if direction == 'forward':
        GPIO.output(IN1, GPIO.HIGH)
        GPIO.output(IN2, GPIO.LOW)
    elif direction == 'backward':
        GPIO.output(IN1, GPIO.LOW)
        GPIO.output(IN2, GPIO.HIGH)
    else:
        GPIO.output(IN1, GPIO.LOW)
        GPIO.output(IN2, GPIO.LOW)

    # 모터 동작 시간
    time.sleep(duration)

    # 모터 정지
    GPIO.output(IN1, GPIO.LOW)
    GPIO.output(IN2, GPIO.LOW)

# 리니어 모터 제어
try:
    while True:
        #control_linear_motor('forward', 1)  # 1초 동안 정방향으로 회전
        #time.sleep(1)# 1초 대기
        control_linear_motor('backward', 15)  # 1초 동안 역방향으로 회전
        time.sleep(1)# 1초 대기

except KeyboardInterrupt:
    # Ctrl+C가 입력되면 예외 발생하여 프로그램 종료
    GPIO.cleanup()
