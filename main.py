from fastapi import FastAPI
import uvicorn
#install fastapi (pip) and uvicorn files
from fastapi.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

import Scripts.system as System
import Scripts.settings as Settings
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/api/uptime")
async def root():
    print("uptime")
    return System.uptime()

@app.get("/api/temps")
async def root():
    return System.temps()

@app.get("/api/storage")
async def storage():
    return System.disks()

@app.get("/api/settings")
async def settings():
    return Settings.readSettings()

class Item(BaseModel):
    metric:bool

@app.post("/api/settings")
async def setSave(item: Item):
    Settings.saveSettings(item)
    return item


app.mount("/", StaticFiles(directory="./atc-react/build/", html=True),name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

