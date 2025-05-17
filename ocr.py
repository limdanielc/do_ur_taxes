import os
from openai import OpenAI

client = OpenAI(
    api_key="sk-26c75a2b04c9467ea85303ed3830d20f",
    base_url="https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
)
completion = client.chat.completions.create(
    model="qwen-vl-plus", 
    messages=[{"role": "user","content": [
            {"type": "text","text": "What is this"},
            {"type": "image_url",
             "image_url": {"url": "https://oss-pai-igq5vbc7mq77cfapzu-ap-southeast-3.oss-ap-southeast-3.aliyuncs.com/receipts/1000-receipt.jpg"}}
            ]}]
    )
print(completion.model_dump_json())
