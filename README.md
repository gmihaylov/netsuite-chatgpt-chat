# NetSuite ChatGPT Chat Popup
Ask ChatGPT NetSuite questions directly from your transactions.

## Example usage
![App Screenshot](screenshots/screenshot8.gif)

## What if ChatGPT refuses to complete requested tasks or produce wrong answers? Maybe its seasonal depression?
![App Screenshot](screenshots/screenshot9.jpg)

## Remembering of previous messages / history / preserving context 
- Since version 1.1.0 the Service Suitelet is sending back all messages from the previous conversation to the API.
- Context is preserved by current user in the JSON file.
- Even if you log out from NetSuite and log in again on the other day, your conversation will be preserved, and you can ask what you asked previously.
  
![App Screenshot](screenshots/screenshot10.png)
- History of previous conversation is preserved in the Script Folder in format UserID.json. You can delete previous conversation by deleting JSON file.

![App Screenshot](screenshots/screenshot11.png)

## Example of historical context
User:

Please remember my name and always reply with: "**George**, here is your answer:"

Assistant:
_Understood, **George**! I will remember your name and reply with "**George**, here is your answer:" before providing the response. How can I assist you today?_

User:
where to find Reports?

Assistant:
_**George**, here is your answer: To find Reports in NetSuite: 1. Log in to your NetSuite account. 2. Navigate to the "Reports" menu at the top of the page. 3. Select the desired report category, such as Financial, Sales, or Inventory. 4. From the drop-down menu, choose the specific report you want to access. 5. This will take you to the Report page, where you can customize the report parameters and generate the report based on your preferences._

User: Thanks!

Assistant:
_You're welcome, **George**! If you have any more questions, feel free to ask. I'm here to help!_

**.... on the other day:**

User: 
Where to find saved searches?

Assistant:
_**George**, here is your answer: To find saved searches in NetSuite: 1. Log in to your NetSuite account. 2. Navigate to the "Lists" menu at the top of the page. 3. Select "Search" from the drop-down menu. 4. In the second drop-down menu, click on "Saved Searches". 5. This will take you to the Saved Searches menu page, where you can view and manage your saved searches._

**.... on the day after tomorrow:**

User: Hello

Assistant:
_Hello, **George!** How can I assist you today?_
> More info can be found here (https://community.openai.com/t/gpt-3-5-turbo-how-to-remember-previous-messages-like-chat-gpt-website/170370/5)

## Architecture
- NetSuiteChatGPTChat_UE Uservent Script
  - Adds INLINEHTML field on beforeLoad
  - Content including html, js, css is injected from ./html/chat.html file into INLINEHTML field
  - User Event is deployed on Sales Order record and chat popup will show on scriptContext.UserEventType.VIEW
- NetSuiteChatGPTChat_SL Suitelet Script
  - Acts like service to connect to OpenAI API
  - Responses from OpenAI -> NetSuiteChatGPTChat_SL are fetched and rendered in the chat popup by chat.html

## How to switch between ChatGPT 3.5 / ChatGPT 4?
- In NetSuiteChatGPTChat_SL
  - const OPENAI_MODEL = OPENAI_MODELS.GPT3; for ChatGPT 3.5-Turbo (Default)
  - const OPENAI_MODEL = OPENAI_MODELS.GPT4; for ChatGPT 4 (May answer slower)

## How to adjust model temperature?
- In NetSuiteChatGPTChat_SL
  - const OPENAI_TEMPERATURE = 1; //What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. Defaults to 1

## Supported OpenAI (ChatGPT) Models:
 Model              | Description                                                                                                                                                                                                                                                  | Config Option in NetSuiteChatGPTChat_SL                             |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| gpt-4-1106-preview | **GPT-4 Turbo**<br/>The latest GPT-4 model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Returns a maximum of 4,096 output tokens. This preview model is not yet suited for production traffic. | const OPENAI_MODEL = OPENAI_MODELS.GPT4TURBO; |
| gpt-4      | Currently points to gpt-4-0613                                                                                                                                                                                                                                          | const OPENAI_MODEL = OPENAI_MODELS.GPT4;      |
| gpt-3.5-turbo-1106 | **Updated GPT 3.5 Turbo**<br/>The latest GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Returns a maximum of 4,096 output tokens.| const OPENAI_MODEL = OPENAI_MODELS.GPT3;      
> More information can be found here https://platform.openai.com/docs/models

## Considerations
- May break NetSuite functionalities / view
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
![App Screenshot](screenshots/screenshot4.png)
![App Screenshot](screenshots/screenshot1.png)
![App Screenshot](screenshots/screenshot3.png)
![App Screenshot](screenshots/screenshot2.png)
