import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
	fs.readFile(contactsPath).then((data) => console.table(JSON.parse(data)));
}

function getContactById(contactId) {
	fs.readFile(contactsPath)
		.then((data) => {
			const contacts = JSON.parse(data);
			const contact = contacts.find((contact) => contact.id === +contactId);
			console.table(contact);
		})
		.catch((err) => console.log(err.message));
}

function removeContact(contactId) {
	let filterdContact = [];
	fs.readFile(contactsPath)
		.then((data) => {
			const contacts = JSON.parse(data);
			filterdContact = contacts.filter((contact) => contact.id !== +contactId);

			const filterdContactJSON = JSON.stringify(filterdContact);

			fs.writeFile(contactsPath, filterdContactJSON, (err) => {
				if (err) console.error("writeFileError: ", err);
			});
		})
		.catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
	let contacts = [];
	fs.readFile(contactsPath)
		.then((data) => {
			contacts = JSON.parse(data.toString());
			let id = contacts.length + 1;

			const newContacts = {
				id,
				name,
				email,
				phone,
			};
			contacts.push(newContacts);
			const newContactsJSON = JSON.stringify(contacts);

			fs.writeFile(contactsPath, newContactsJSON, (err) => {
				if (err) console.error(err);
			});
		})
		.catch((error) => console.log(error));
}

export default {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
