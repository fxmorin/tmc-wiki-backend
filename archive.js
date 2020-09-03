/*
Litematic archive handling
*/

const fs = require('fs');

const index = (req, res) => {
	var lsFiles = fs.readdirSync('./archive/');
	
	var response = 	`
					<style>
					table, th, td {
  						border: 1px solid black;
  						border-collapse: collapse;
  						padding: 5px;
					}

					button {
						position: fixed;
						bottom: 5px;
						right: 5px;
						margin: 0;
						padding: 5px 3px;
					}
					</style>

					<a href="/archive-upload">
    					<button type="button">
      						<b> UPLOAD </b>
    					</button>
					</a>

					<table>
					<thead>
  						<tr>
    						<th>Name</th>
    						<th>Size</th>
    						<th>Created</th>
    						<th>Download</th>
  						</tr>
					</thead>
					<tbody>
					`

	lsFiles.forEach(file => {
		if(file == '.nodelete') {
			return;
		}
		var stats= fs.statSync(`./archive/${file}`);

		name = file;
		size = stats.size;
		created = stats.ctime;

		response +=	`
					<tr>
    					<td>${name}</td>
    					<td>${size / 1000}Kb</td>
    					<td>${created.toISOString()}</td>
    					<td>
    						<a href="/archive/${name}">
    							Click here
    						</a>
    					</td>
  					</tr>
  					`
	});
	response +=	`
				</tbody>
				</table>
				`

	res.send(response);
}
exports.index = index;

const download = (req, res) => {
	res.download(`.${req.url}`);
}
exports.download = download;