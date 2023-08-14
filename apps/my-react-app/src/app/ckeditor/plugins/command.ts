/* eslint-disable eqeqeq */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';
import mix from '@ckeditor/ckeditor5-utils/src/mix';
import { Editor } from '@ckeditor/ckeditor5-core';

export default class Command {
  constructor(editor: Editor) {
    this.editor = editor;
    this.set('value', undefined);
    this.set('isEnabled', false);

    this._disableStack = new Set();
    this.decorate('execute');
    this.listenTo(this.editor.model.document, 'change', () => {
      this.refresh();
    });

    this.on(
      'execute',
      (evt) => {
        if (!this.isEnabled) {
          evt.stop();
        }
      },
      { priority: 'high' }
    );

    this.listenTo(editor, 'change:isReadOnly', (evt, name, value) => {
      if (value) {
        this.forceDisabled('readOnlyMode');
      } else {
        this.clearForceDisabled('readOnlyMode');
      }
    });
  }

  refresh() {
    this.isEnabled = true;
  }

  forceDisabled(id) {
    this._disableStack.add(id);

    if (this._disableStack.size == 1) {
      this.on('set:isEnabled', forceDisable, { priority: 'highest' });
      this.isEnabled = false;
    }
  }

  clearForceDisabled(id) {
    this._disableStack.delete(id);

    if (this._disableStack.size == 0) {
      this.off('set:isEnabled', forceDisable);
      this.refresh();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  execute() {}

  destroy() {
    this.stopListening();
  }
}

mix(Command, ObservableMixin);

function forceDisable(evt) {
  evt.return = false;
  evt.stop();
}
