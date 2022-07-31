export class TagController {
	async createTag(req, res) {
		try {
			res.status(200).json({});
		} catch ({ message }) {
			res.status(400).json({ error: message });
		}
	}
	async getTags(req, res) {
		try {
			res.status(200).json({});
		} catch ({ message }) {
			res.status(400).json({ error: message });
		}
	}
	async getTagById(req, res) {
		try {
			res.status(200).json({});
		} catch ({ message }) {
			res.status(400).json({ error: message });
		}
	}
	async updateTagById(req, res) {
		try {
			res.status(200).json({});
		} catch ({ message }) {
			res.status(400).json({ error: message });
		}
	}
	async deleteTagById(req, res) {
		try {
			res.status(200).json({});
		} catch ({ message }) {
			res.status(400).json({ error: message });
		}
	}
}
