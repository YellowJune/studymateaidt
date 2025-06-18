response = requests.post(
  "https://api.openai.com/v1/chat/completions", 
  headers={"Authorization": f"Bearer {""}"},
  json={"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "야!"}]}
)


response.json()["choices"][0]["message"]["content"]
