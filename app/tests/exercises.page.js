import { Selector } from 'testcafe';
import { PageIDs } from '../imports/ui/utilities/ids';

class ExercisesPage {
  constructor() {
    this.pageId = `#${PageIDs.exercisesPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 20 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(20000).expect(this.pageSelector.exists).ok();
  }
}

export const exercisesPage = new ExercisesPage();
