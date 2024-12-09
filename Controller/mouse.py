import pyautogui

pyautogui.FAILSAFE = False
screenWidth, screenHeight = pyautogui.size()

def move(x, y):
    X = float(x) / 100 * screenWidth
    Y = float(y) / 100 * screenHeight
    pyautogui.moveTo(X, Y)

def click(x, y):
    X = float(x) / 100 * screenWidth
    Y = float(y) / 100 * screenHeight
    pyautogui.click(X, Y)

def lock(x, y):
    #X = float(x) / 100 * screenWidth
    #Y = float(y) / 100 * screenHeight
    pyautogui.mouseDown(button='left')

def unlock(x, y):
    #X = float(x) / 100 * screenWidth
    #Y = float(y) / 100 * screenHeight
    pyautogui.mouseUp(button='left')

def right(x, y):
    #X = float(x) / 100 * screenWidth
    #Y = float(y) / 100 * screenHeight
    pyautogui.rightClick()

def wheel_up():
    pyautogui.scroll(100)

def wheel_down():
    pyautogui.scroll(-100)