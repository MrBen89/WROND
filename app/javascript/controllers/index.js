// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
import PuzzleController from "controllers/puzzle_controller"
import ModeController from "controllers/mode_controller"  // Import your ModeSelectorController

eagerLoadControllersFrom("controllers", application)
application.register("puzzle", PuzzleController)
application.register("mode-selector", ModeController)  // Register your ModeSelectorController
