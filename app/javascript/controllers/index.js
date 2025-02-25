// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
import PuzzleController from "controllers/puzzle_controller"
import ModeController from "controllers/mode_controller"  // Import your ModeSelectorController
import WrondarouController from "controllers/wrondarou_controller"  // Import your ModeSelectorController
import PracticeController from "controllers/practice_controller"

eagerLoadControllersFrom("controllers", application)
application.register("puzzle", PuzzleController)
application.register("mode-selector", ModeController)  // Register your ModeSelectorController
application.register("hint", WrondarouController) 
application.register("practice", PracticeController)// Register your ModeSelectorController
// import ModeController from "controllers/mode_controller"  // Import your ModeSelectorController


// application.register("mode-selector", ModeController)  // Register your ModeSelectorController

