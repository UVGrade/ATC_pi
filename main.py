from fastapi import FastAPI
import uvicorn
#install fastapi (pip) and uvicorn files
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.staticfiles import StaticFiles

from fastapi.templating import Jinja2Templates

import Scripts.system as System
import Scripts.settings as Settings
from pydantic import BaseModel

app = FastAPI(title="ATC_Pi")
apiApp = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]
apiApp.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



@apiApp.get("/uptime")
async def root():
    return System.uptime()

@apiApp.get("/temps")
async def root():
    return System.temps()

@apiApp.get("/storage")
async def storage():
    return System.disks()

@apiApp.get("/settings")
async def settings():
    return Settings.readSettings()

class Item(BaseModel):
    metric:bool

@apiApp.post("/settings")
async def setSave(item: Item):
    Settings.saveSettings(item)
    return item



app.mount("/api", apiApp)
app.mount("/", StaticFiles(directory="atc-react/build", html=True), name="react")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

