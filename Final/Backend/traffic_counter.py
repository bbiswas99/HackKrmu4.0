import random

THRESHOLD_CARS = 50

def check_congestion(start, end):
    cars_on_route = random.randint(20, 100)

    if cars_on_route > THRESHOLD_CARS:
        alternate_route = {"start": [77.101, 28.703], "end": [77.110, 28.710]}
        return True, alternate_route
    else:
        return False, None
