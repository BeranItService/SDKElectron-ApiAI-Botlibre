//SOLICITUD DE AUTENTIFICACION AL MAIN (BACKEND)
const {ipcRenderer} = require('electron')
ipcRenderer.send('autentificate', 'inicio')


// VARIABLE GLOBAL PARA AUTENTIFICARSE
var botLibre = "";

// LA APLICACION FUNCIONA EN TANTO SE ESTE AUTENTIFICADO CORRECTAMENtE
ipcRenderer.on('autentificado', (event, arg) => {
	
	// TOMA LA VARIABLE DEL MAIN (BACKEND)
	botLibre = arg;


//CONFIGURACION SDK PARA AVATAR ANIMADO
      SDK.applicationId = botLibre;
      var sdk = new SDKConnection();
      var web = new WebAvatar();
      web.connection = sdk;
      web.avatar = "<avatarID>";
      web.voice = "istc-lucia-hsmm";
      web.voiceMod = "default";
      web.lang = "es";
      web.width = "250";
      web.height = "300";
      web.prefix = null
      web.addMessage("Bienvenido", "like", "smile", "");
      web.processMessages();
	  
//CONFIGURACION DEL DOM
      $(document).ready(function() {
	// UNA VEZ QUE EL USUARIO APRETA ENTER
      $("#chat").keypress(function(event) {
      if (event.which == 13) {
      event.preventDefault();
	  // SE LLAMA A LA FUNCION ENVIAR
      enviar();
      }
      });
      $("#rec").click(function(event) {
      switchRecognition();
      });
      });
      var recognition;
      function startRecognition() {
      recognition = new webkitSpeechRecognition();
      recognition.onstart = function(event) {
      updateRec();
      };
      recognition.onresult = function(event) {
      var text = "";
      for (var i = event.resultIndex; i < event.results.length; ++i) {
      text += event.results[i][0].transcript;
      }
      setInput(text);
      stopRecognition();
      };
      recognition.onend = function() {
      stopRecognition();
      };
      recognition.lang = "es";
      recognition.start();
      }
      function stopRecognition() {
      if (recognition) {
      recognition.stop();
      recognition = null;
      }
      updateRec();
      }
      function switchRecognition() {
      if (recognition) {
      stopRecognition();
      } else {
      startRecognition();
      }
      }
      function setInput(text) {
      $("#chat").val(text);
      send();
      }
      function updateRec() {
      $("#rec").text(recognition ? "mic" : "mic_none");
      }
      function enviar() {
      var text = $("#chat").val();
	  // SE LE MANDA AL MAIN (BACKEND) UN MENSAJE CON EL INPUT DEL USUARIO
	  ipcRenderer.send("enviar", text);

      }

	  // ACA SE RECIBE LA RESPUESTA DEL BACKEND, SE ACTUALIZA AL DOM Y SE EJECUTA LA FUNCION DE PROCESAR MENSAJE EN EL AVATAR
	  ipcRenderer.on('respondiendo', (event, arg) => {
	  $("#response").text("Bot: "+arg);
	  web.addMessage(arg, "", "", "");
      web.processMessages();
	});
	  
});