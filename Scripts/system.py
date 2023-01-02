import os
import json
import shutil
import psutil
#pip install psutil

sys_temps="/sys/class/thermal/"

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
    try:
        with open(sys_temps + file + '/temp') as f:
            temp=float(f.readline().strip())/1000
    except ValueError:
        temp=None
    try:
        with open(sys_temps + file + '/type') as f:
            type=f.readline().strip()
    except ValueError:
        type=None
    return {
        "id":file,
        "temp":temp,
        "type":type
    }



#print(shutil.disk_usage('/boot/efi'))
json_formatted_str = json.dumps(disks(), indent=2)
#print(json_formatted_str)