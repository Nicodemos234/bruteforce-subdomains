const axios = require('axios');
const fs = require('fs');
const domain = 'domain.com.br';

fs.readFile('whitelist.txt', 'utf8', (err, data) => {
	if(err) throw err;
	const subdomains = data.split('\n');
	let iterator = 0;
	const interval = setInterval(() => {
		if(!subdomains[iterator]) {
			clearInterval(interval);
			return;
		}
		const subdomain = subdomains[iterator]
		axios.get(`https://${subdomain}.${domain}`).then(res => console.log(res.status, ' - ', subdomain)).catch(() => console.log(`${subdomain} failed`));
		iterator++;
	}, 500);
});

