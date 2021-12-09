const axios = require('axios')
const path = require('path')

console.log(path.join(__dirname +'./../../temp/message.json'))

        try {
            if (!message.hasNewMessage) return;

            message = message.messages.all()[0];


            if (!message.message || message.key.fromMe || message.key && message.key.remoteJid == 'status@broadcast') return;
            if (message.message.ephemeralMessage) {
                message.message = message.message.ephemeralMessage.message;
            }
            
            const senderNumber = message.key.remoteJid;
            const isGroup = message.participant;
            const imageMessage         = message.message.imageMessage;
            const videoMessage         = message.message.videoMessage;
            const stickerMessage       = message.message.stickerMessage;
            const extendedTextMessage  = message.message.extendedTextMessage;
            const quotedMessageContext = extendedTextMessage && extendedTextMessage.contextInfo && extendedTextMessage.contextInfo;
            const quotedMessage        = quotedMessageContext && quotedMessageContext.quotedMessage;

            let buttons = message.message.buttonsResponseMessage

            let buttonMessages;

            if (buttons != undefined) {
                buttonMessages = buttons.selectedDisplayText
            }

            const textMessage = message.message.conversation || message.message.extendedTextMessage && message.message.extendedTextMessage.text || imageMessage && imageMessage.caption || videoMessage && videoMessage.caption || buttonMessages

            const sender = conn.contacts[senderNumber]

            console.log("from", senderNumber);
            console.log("sender", sender)
            console.log("buttons", buttons)
            console.log("buttonMessages", buttonMessages)
            console.log("sticker message", stickerMessage);
            console.log("quote message", quotedMessage);
            console.log("command and args", textMessage);
            console.log("is group", isGroup)

            let WAUser = sender?.notify || sender?.short || sender?.name || sender?.vname || conn?.user?.name

            console.log('wa user', WAUser);
            
            
            if (textMessage == '.menu') {

                const buttons = [{
                    buttonId  : 'id1',
                    buttonText: {
                        displayText: '!help'
                    },
                    type: 1
                },
                {
                    buttonId  : 'id2',
                    buttonText: {
                        displayText: '!contact'
                    },
                    type: 1
                }
                ]

                const buttonMessage = {
                    contentText: `Halo selamat datang di *${conn.user.name}* silahkan gunakan *.help* untuk melihat perintah yang tersedia 😆`,
                    footerText : 'kamu juga bisa menekan tombol ini',
                    buttons    : buttons,
                    headerType : 1
                }

                conn.sendMessage(senderNumber, buttonMessage, MessageType.buttonsMessage, {
                    quoted: message
                });
                
            } else if (textMessage == '.sticker') {

                conn.sendMessage(senderNumber, {url: __dirname + './../../public/com.webp'}, MessageType.sticker, {
                    quoted: message
                });
                
            } else if (textMessage == '.list') {
                // send a list message!
                const rows = [
                {title: 'Row 1', description: "Hello it's description 1", rowId:"rowid1"},
                {title: 'Row 2', description: "Hello it's description 2", rowId:"rowid2"}
                ]

                const sections = [{title: "Section 1", rows: rows}]

                const button = {
                buttonText: 'Click Me!',
                description: "Hello it's list message",
                sections: sections,
                listType: 1
                }

                try {
                    await conn.sendMessage(senderNumber, button, MessageType.listMessage, {
                    quoted: message
                })
                } catch (error) {
                    console.log(error);
                }
            } else if (textMessage == '.file') {
                
                await conn.sendMessage(
                    senderNumber, 
                    {url: './images.png'}, // load a gif and send it
                    MessageType.image, 
                    { mimetype: Mimetype.png, caption: "hello!" , quoted: message}
                )
            }
            
            
        } catch(e) {
            console.log("[ERROR] " + e.stack);
            
            // let theError = ""

            // if(e.message == "Cannot read properties of undefined (reading 'Key')"){
            // 	theError = "Perintah tidak ditemukan";
            // }else{
            // 	theError = e.message;
            // }

            // conn.sendMessage(message.key.remoteJid, `Aduh maaf ya perintah yang kamu kirim tidak tersedia atau mungkin terjadi error😭\n\n\nError log:\u0060\u0060\u0060\n${theError}\u0060\u0060\u0060`, "conversation", { quoted: message });
        
        }