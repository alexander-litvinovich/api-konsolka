![image](https://github.com/alexander-litvinovich/api-konsolka/assets/11630525/bceaf11c-89c5-4c76-90ab-74c855ad43ec)

# Sendsay API Könsolkå
This is a browser extension that provides a humble GUI for Sendsay API. 💾 [The last build from 7 Jun 2021](https://github.com/alexander-litvinovich/api-konsolka/blob/master/build.zip) (discontinued)

![console-screenshots](https://github.com/alexander-litvinovich/api-konsolka/assets/11630525/3d74686c-f4a8-431f-a36c-ab8c7436315c)

---

## Session hijacking and quick login
If there are open tabs in the browser window with a logged-in user (in the application), the session hijacking modal will appear on the authorization screen:

![session-hijack](https://github.com/alexander-litvinovich/api-konsolka/assets/11630525/d7db87ca-7c29-4750-bc2e-0877f13b9a5d)

---

## Features
Right now, the console can:
- Log in with a password
- Log in with API key
- Hijack sessions from a window with a new interface
- Send requests
- Format text
- Copy session code

TBD in future:
- [ ]  Queries history
- [ ]  Queries templates
- [ ]  Table view for the results
- [ ]  Export tables in CSV
- [ ]  Work in standalone window
- [ ]  Autofill login and password for quick login
- [ ]  Autofill a support password
🤔 maybe something else

---

## How to install in Chrome
1. Unpack the "[build.zip](https://github.com/alexander-litvinovich/api-konsolka/blob/master/build.zip)" somewhere

2. Open chrome settings page:

   ![chrome-settings](https://github.com/alexander-litvinovich/api-konsolka/assets/11630525/fe028f48-ea18-449c-b36d-cab21d00235a)

4. Open the "Extensions" page:

   ![settings-page](https://github.com/alexander-litvinovich/api-konsolka/assets/11630525/3d587865-c844-4899-a7d5-6038bcd27026)
   
5. Turn on "Developer mode":

   ![developer mode](https://github.com/alexander-litvinovich/api-konsolka/assets/11630525/b271334a-b7ac-4530-894a-1f15e5b1bc6b)

6. Load the unpacked extension from the build folder (files from "build.zip"):

   ![use unpacked ext](https://github.com/alexander-litvinovich/api-konsolka/assets/11630525/89fe5962-9c6e-4413-aba7-d08a2b88b74c)

7. When the extension is installed, it will appear as the following card:

   ![ext-installed](https://github.com/alexander-litvinovich/api-konsolka/assets/11630525/9fa23cba-88e2-42ce-b0e2-1a9b26030524)

And now it's accessible on every browser tab.
