const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
} = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			//node index.js --action="list"
			listContacts();
			break;

		case "get":
			//node index.js --action="get" --id='gxrgyCiA6'
			getContactById(id);
			break;

		case "add":
			//  node index.js -a add -n sergii -e sergi@mai.com -p 0960792310
			// ... name email phone
			addContact(name, email, phone);
			break;

		case "remove":
			// ... id
			removeContact(id);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);
