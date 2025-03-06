// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
import PuzzleController from "controllers/puzzle_controller"
import ModeController from "controllers/mode_controller"  // Import your ModeSelectorController
import PracticeController from "controllers/practice_controller"
import TimerController from "controllers/timer_controller"
import P1PuzzleController from "controllers/p1_puzzle_controller"
import P2PuzzleController from "controllers/p2_puzzle_controller"
import WrondarouController from "controllers/wrondarou_controller"  // Import your ModeSelectorController
import IndexSideMenuController from "controllers/index_side_menu_controller"
import FadeController from "./fade_controller";

eagerLoadControllersFrom("controllers", application)
application.register("puzzle", PuzzleController)
application.register("mode-selector", ModeController)  // Register your ModeSelectorController
application.register("practice", PracticeController)
application.register("p1_puzzle", P1PuzzleController)
application.register("p2_puzzle", P2PuzzleController)
application.register("timer", TimerController)
application.register("hint", WrondarouController)
application.register("index-side-menu", IndexSideMenuController)
application.register("fade", FadeController);
