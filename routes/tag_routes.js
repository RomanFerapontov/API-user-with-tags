import { TagController } from "../controllers/tag_controller.js";

export class TagRoutes {
	constructor() {
		this.tagController = new TagController();
	}
	route(app) {
		app.get("/tag", this.tagController.getTagById);
		app.post("/tag", this.tagController.createTag);
		app.get("/tag/:id", this.tagController.getTagById);
		app.put("/tag/:id", this.tagController.updateTagById);
		app.delete("/tag/:id", this.tagController.deleteTagById);
	}
}
