'use babel';

import Robot2pythonkeyword from '../lib/robot2pythonkeyword';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Robot2pythonkeyword', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('robot2pythonkeyword');
  });

  describe('when the robot2pythonkeyword:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.robot2pythonkeyword')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'robot2pythonkeyword:fetch');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.robot2pythonkeyword')).toExist();

        let robot2pythonkeywordElement = workspaceElement.querySelector('.robot2pythonkeyword');
        expect(robot2pythonkeywordElement).toExist();

        let robot2pythonkeywordPanel = atom.workspace.panelForItem(robot2pythonkeywordElement);
        expect(robot2pythonkeywordPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'robot2pythonkeyword:fetch');
        expect(robot2pythonkeywordPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.robot2pythonkeyword')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'robot2pythonkeyword:fetch');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let robot2pythonkeywordElement = workspaceElement.querySelector('.robot2pythonkeyword');
        expect(robot2pythonkeywordElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'robot2pythonkeyword:fetch');
        expect(robot2pythonkeywordElement).not.toBeVisible();
      });
    });
  });
});
