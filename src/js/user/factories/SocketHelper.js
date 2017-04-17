angular.module('DigiControl').factory('SocketHelper', function(socket) {
	// request input mutes
	// setInterval(function() {
	// 	Socket.emit("request", "inputMutes");
	// }, 20000);

	var Socket = null;
	var connected = false;

	return {
		Connect: function(url, port) {
			// initialise
			Socket = socket.init(url, port)

			Socket.on('connect', function() {
				Socket.emit('subscribe', "announcements");
				Socket.emit('subscribe', 'engineer');
				Socket.emit('subscribe', 'name/input');
				Socket.emit('subscribe', 'name/aux');
				Socket.emit('subscribe', "volume/aux");
				Socket.emit('subscribe', "mute/input");
			});

			this.Connected = true;
		},

		Connected: false, // false by default

		RequestConfig: function() {
			if (Socket != null) {
				Socket.emit('request', 'consoleConfig');
			} else {
				return false;
			}
		},

		RequestAuxVolume: function() {
			if (Socket != null) {
				Socket.emit('request', 'inputAuxLevelVolume');
			} else {
				return false;
			}
		},

		RequestInputNames: function() {
			if (Socket != null) {
				Socket.emit('request', 'inputNames');
			} else {
				return false;
			}
		},

		RequestAuxNames: function() {
			if (Socket != null) {
				Socket.emit('request', 'auxNames');
			} else {
				return false;
			}
		},

		SetAuxVolume: function(aux, channel, volume) {
			if (Socket != null) {
				Socket.emit('volume/aux', JSON.stringify({a:aux, c:channel, v:volume}));
			} else {
				return false;
			}
		},

		SoloAux: function(aux, value) {
			if (Socket != null) {
				Socket.emit('auxsolo', aux);
			} else {
				return false;
			}
		}
	};
});
