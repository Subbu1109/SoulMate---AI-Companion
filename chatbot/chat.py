import requests

def chat_with_bot(message):
    url = "http://127.0.0.1:11434/api/generate"

    prompt = (
        "You are a compassionate and empathetic AI trained to provide emotional and mental support."
        "Reply to the user with compassion, warmth, and comfort in less than 100 characters.\n"
        f"User: {message}\n"
        "Bot:"
    )

    payload = {
        "model": "gemma:2b",
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(url, json=payload)

    if response.status_code == 200:
        return response.json()["response"].strip()
    else:
        return f"Error {response.status_code}: {response.text}"


print("Emotional Support Bot (type 'exit' to stop)")

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break
    bot_reply = chat_with_bot(user_input)
    print(f"Bot: {bot_reply}")
