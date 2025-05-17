from dotenv import load_dotenv
import os
from qwenai import QwenAI

load_dotenv()  # loads from .env automatically

api_key = os.getenv("DASHSCOPE_API_KEY")

client = QwenAI(api_key=api_key)

response = client.chat.completions.create(
    messages=[{"role": "user", "content": "Hello, world!"}],
    model="qwen-plus",
)

print(response)
