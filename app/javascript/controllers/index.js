// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
import PuzzleController from "controllers/puzzle_controller"
import CardController from "controllers/card_controller"

eagerLoadControllersFrom("controllers", application)
application.register("puzzle", PuzzleController)
application.register("card", CardController)

import KanjiController from "controllers/kanji_controller";  // Adjust path if necessary
application.register("kanji", KanjiController);
