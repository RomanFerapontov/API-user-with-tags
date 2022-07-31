import { UserController } from "../controllers/user_controller.js";

export class UserRoutes {
	constructor() {
		this.userController = new UserController();
	}

	route(app) {
		app.get("/user", this.userController.getUser);
		app.put("/user", this.userController.updateUser);
		app.delete("/user", this.userController.deleteUser);
		app.get("/user/tag/my", this.userController.getUserTag);
		app.delete("/user/tag/:id", this.userController.deleteUserTagById);
	}
}
