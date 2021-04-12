// const {
// 	listContacts,
// 	getContactById,
// 	removeContact,
// 	addContact,
// } = require("./contacts.js");
import contacts from "./contacts.js";

import { Command } from "commander/esm.mjs";
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
			contacts.listContacts();
			break;

		case "get":
			console.log(5556);

			contacts.getContactById(id);
			break;

		case "add":
			//  -a add -n sergii -e sergi@mai.com -p 0960792310
			// ... name email phone
			contacts.addContact(name, email, phone);
			break;

		case "remove":
			// ... id
			contacts.removeContact(id);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);
