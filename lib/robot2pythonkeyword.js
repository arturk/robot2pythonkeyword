'use babel';

import Robot2pythonkeywordView from './robot2pythonkeyword-view';
import { CompositeDisposable } from 'atom';

export default {

  robot2pythonkeywordView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.robot2pythonkeywordView = new Robot2pythonkeywordView(state.robot2pythonkeywordViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.robot2pythonkeywordView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'robot2pythonkeyword:fetch': () => this.fetch()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.robot2pythonkeywordView.destroy();
  },

  serialize() {
    return {
      robot2pythonkeywordViewState: this.robot2pythonkeywordView.serialize()
    };
  },

  fetch() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
        let selection = editor.getSelectedText();
        var range = editor.getSelectedBufferRange();
        console.log(range);
        range.end.column += 4;
        let python_def = 'def ' + selection.toLowerCase().replace(/ /g, "_");
        editor.insertText(python_def);
        editor.setSelectedBufferRange(range);
        atom.commands.dispatch(atom.views.getView(atom.workspace), 'project-find:toggle');
        editor.undo();
    };
  }

};
