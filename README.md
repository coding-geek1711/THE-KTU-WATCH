# THE KTU WATCH

THE KTU WATCH is a discord bot which monitors the Official KTU Announcements page and raises notifications on your Discord channel.
It is written in NodeJS and uses the DiscordJS module for communicating with Discord

- Uses Axios for estabilishing communication with KTU Announcements and fetches the HTML Page.
- Uses JSDOM to parse the HTML Page and extract Date and Notification from the HTML file.
- object-hash module is used to hash the entire object and stored in hash.txt, this is how we identify a change in the notifications
- Data scraped from the website is stored as data.json in our server.

All modules interacting with the Official page is written in such a way that it can repurposed for other applications too, say Telegram or Twilio BOTS.

## NOTE:

    - Tried to include the direct download links by scraping the href tags of anchor elements inside the notifications link, turns out a CDN is used causing the URL for link to be changed every time new GET request is sent, so hash will effectively change everytime, so couldnt include it.
    - Workaround is being pondered over, feel free to contact me if u have any ideas abt it!!

Enjoy!!
