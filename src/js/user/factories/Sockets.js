angular.module('DigiControl').factory('socket', function (socketFactory) {
	return {
		init: function(url, port) {
			const host = 'http://'+url+':'+port;
			var socket = socketFactory({
				ioSocket: io.connect(host)
			});

			// config and stuff
			socket.forward('announcements');

			// names
			socket.forward('name/input');
			socket.forward('name/aux');

			// volumes
			socket.forward('volume/aux');

			// mutes
			socket.forward('mute/input');

			// engineer
			socket.forward('engineer');

			return socket;
		}
	};
});
