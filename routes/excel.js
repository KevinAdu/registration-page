var fs = require('fs');

exports.export = function(req, res, db) {
	
	req.db.User.find({}, function(err, users) {
		
		var writeStream = fs.createWriteStream("event.xls");
		var header="Name"+"\t"+"Company"+"\t"+"Address"+"\t"+"Phone Number"+"\t"+"Email"+"\t"+"Attendance"+"\t"+"Comment"+"\n";
		writeStream.write(header);

		users.forEach(function(user, index) {
			writeStream.write(formatRow(user));
		})
		writeStream.end();

		res.download('./event.xls', 'event.xls');
	});
};

function formatRow(user) {
	var fields = ['name', 'company', 'address', 'phoneNumber', 'email', 'attendance', 'comment'];
	var row;

	for (var i = 0; i < fields.length; i++) {
	    row += user[fields[i]] + "\t";
	}

	return row + "\n";
}