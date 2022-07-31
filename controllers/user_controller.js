export class UserController {
	async getUser(req, res) {
		try {
			res.status(200).json({});
		} catch ({ message }) {
			res.status(400).json({ error: message });
		}
	}
	async updateUser(req, res) {
		try {
			res.status(200).json({});
		} catch ({ message }) {
			res.status(400).json({ error: message });
		}
	}
	async deleteUser(req, res) {
		try {
			res.status(200).json({});
		} catch ({ message }) {
			res.status(400).json({ error: message });
		}
	}
	async createUserTag(req, res) {
		try {
			res.status(200).json({});
		} catch ({ message }) {
			res.status(400).json({ error: message });
		}
	}
	async deleteUserTagById(req, res) {
		try {
			res.status(200).json({});
		} catch ({ message }) {
			res.status(400).json({ error: message });
		}
	}
	async getUserTag(req, res) {
		try {
			res.status(200).json({});
		} catch ({ message }) {
			res.status(400).json({ error: message });
		}
	}
}
