import pyautogui
import time

pyautogui.FAILSAFE = False
screenWidth, screenHeight = pyautogui.size()

def keystroke(key):
    try:
        pyautogui.press(key)
    except:
        pass

def short2cut(hold, key):
    try:
        pyautogui.hotkey(hold, key)
    except:
        pass

def short3cut(key_1, key_2, key_3):
    try:
        pyautogui.hotkey(key_1, key_2, key_3)
    except:
        pass

'''
def shortcut(cmd):
    if cmd == 'copy':
        pyautogui.hotkey('ctrl', 'c')
    elif cmd == 'cut':
        pyautogui.hotkey('ctrl', 'x')
    elif cmd == 'paste':
        pyautogui.hotkey('ctrl', 'v')
    elif cmd == 'undo':
        pyautogui.hotkey('ctrl', 'z')
    elif cmd == 'save':
        pyautogui.hotkey('ctrl', 's')
    elif cmd == 'all':
        pyautogui.hotkey('ctrl', 'a')
    elif cmd == 'redo':
        pyautogui.hotkey('ctrl', 'y')
    elif cmd == 'delete':
        pyautogui.hotkey('ctrl', 'd')
    elif cmd == 'print':
        pyautogui.hotkey('ctrl', 'p')
    elif cmd == 'reload':
        pyautogui.hotkey('ctrl', 'r')
    elif cmd == 'close':
        pyautogui.hotkey('ctrl', 'f4')
    elif cmd == 'switch':
        pyautogui.hotkey('alt', 'tab')
    elif cmd == 'cycle':
        pyautogui.hotkey('alt', 'escape')
    elif cmd == 'space':
        pyautogui.hotkey('alt', 'space')
    elif cmd == 'props':
        pyautogui.hotkey('alt', 'enter')
    elif cmd == 'prev':
        pyautogui.hotkey('alt', 'left')
    elif cmd == 'forw':
        pyautogui.hotkey('alt', 'right')
    elif cmd == 'focus':
        pyautogui.hotkey('alt', 'd')
    elif cmd == 'edit':
        pyautogui.hotkey('alt', 'e')
    elif cmd == 'file':
        pyautogui.hotkey('alt', 'f')
    elif cmd == 'help':
        pyautogui.hotkey('alt', 'h')
    elif cmd == 'insert':
        pyautogui.hotkey('alt', 'i')
    elif cmd == 'ribbon':
        pyautogui.hotkey('alt', 'j')
    elif cmd == 'mail':
        pyautogui.hotkey('alt', 'm')
    elif cmd == 'new':
        pyautogui.hotkey('alt', 'n')
'''