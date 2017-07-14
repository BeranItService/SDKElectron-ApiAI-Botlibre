# SDK - Aplicación Base de Electron para usar API.AI y los avatares 3D de Botlibre

Código de integración de un bot de API.AI conectado a un avatar animado de Botlibre. Todas las autentificaciones pasan por Main.

### Autor: Patricio Gerpe

![Avatar](/images/prevista.png)


# Requisitos

* Un agente en API.AI https://www.api.ai
* Una cuenta en BotLibre https://www.botlibre.com

# Instalación

* Entras a una línea de comando
* Escribí "git clone https://github.com/IAARhub/SDKElectron-ApiAI-Botlibre.git"
* Escribí "npm install electron -g"
* Escribí "npm install ."
* Entras al directorio del repositorio -> main.js

En ese script cambias los tokens de las APIs de API.AI y Botlibre:

```javascript
// ACA VA TU APPLICATION ID DE BOT LIBRE
var avatar = "<applicationIDBotlibre";

// ACA VA EL ACCESSTOKEN DE TU AGENTE EN API.AI
var ApiAIid = "<accessTokenAPIAI>";
```

Finalmente, en el archivo "javascripts/ai.js" precisas insertar el ID del avatar que usarás en BotLibre

```javascript
// ACA VA EL ID DE TU AVATAR EN BOT LIBRE
web.avatar = "<avatarID>";
```

