import os
import json
import psutil, datetime #pip install psutil
import time

import Scripts.settings as Settings

sys_temps="/sys/class/thermal/"



def uptime():
    tstamp= psutil.boot_time()
    vals={
        "timestamp":tstamp,
        "uptime": int(time.time() - tstamp)
    }
    print(datetime.datetime.fromtimestamp(psutil.boot_time()).strftime("%Y-%m-%d %H:%M:%S"))
    return vals

print(uptime())

def temps():
    array = []
    for file in os.listdir(sys_temps):
        if "thermal_zone" in file:
            array.append(temp_1(file))
    return array

def disks():
    array=[]
    try:
        for disk in psutil.disk_partitions():
            if disk.fstype and "loop" not in disk.device:
                #print(disk.device, disk.mountpoint, disk.fstype, psutil.disk_usage(disk.mountpoint))
                disk={
                    "dev":disk.device,
                    "mount":disk.mountpoint,
                    "format":disk.fstype,
                    "total":psutil.disk_usage(disk.mountpoint)[0],
                    "used":psutil.disk_usage(disk.mountpoint)[1]
                }
                array.append(disk)
        return array
    except:
        return []




def temp_1(file):
    metric=Settings.readSettings()['metric']
    try:
        with open(sys_temps + file + '/temp') as f:
            temp_f= temp=float(f.readline().strip())/1000
            if not metric:
                temp_f= round((temp * 9 / 5)+32,1)

    except ValueError:
        temp=None
        temp_f=None
    try:
        with open(sys_temps + file + '/type') as f:
            type=f.readline().strip()
    except ValueError:
        type=None
    return {
        "id":file,
        "alias":type,
        "temp_f":temp_f,
        'temp_m':metric,
        "temp":temp,
        "type":type
    }



#print(shutil.disk_usage('/boot/efi'))
#son_formatted_str = json.dumps(disks(), indent=2)
#print(json_formatted_str)