# NetSuite ChatGPT Chat
Ask ChatGPT NetSuite questions directly from your transactions.

![App Screenshot](screenshots/screenshot1.png)

## Architecture
- NetSuiteChatGPTChat_UE Uservent Script
  - Adds inline html field
  - Content including html, js, css is added from html/chat.html file
  - User Event is deployed on Sales Order record and chat popup will show on VIEW
- NetSuiteChatGPTChat_SL Suitelet Script
  - Acts like service to connect to OpenAI API
  - Responses to fetch api from chat.html

## Considerations
- Can break NetSuite functionalities / view
- Not a production version
- Not well tested
- Use at your own risk

## How to Setup
- Put your OpenAI API Key in NetSuiteChatGPTChat_SL in OPENAI_API_KEY const
- System prompt can be customized, currently "You are a NetSuite assistant, skilled in NetSuite concepts with creative flair."

## How to obtain OpenAI API Keys
- Go to https://platform.openai.com/api-keys
- Click on "+Create new secret key"
![App Screenshot](screenshots/screenshot5.png)
- Enter name E.g. NetSuite
![App Screenshot](screenshots/screenshot6.png)
- Click on "Create secret key" & copy secret
![App Screenshot](screenshots/screenshot7.png)
- Edit NetSuiteChatGPTChat_SL.js and put secret in OPENAI_API_KEY const

## Credits
- Popup-chat-window (https://github.com/KRISHNAPRASADEK/Popup-chat-window)

## Screenshots

![App Screenshot](screenshots/screenshot3.png)
![App Screenshot](screenshots/screenshot4.png)
![App Screenshot](screenshots/screenshot2.png)
