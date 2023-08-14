/* eslint-disable @typescript-eslint/ban-types */
// check
import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';
import mix from '@ckeditor/ckeditor5-utils/src/mix';
import { Editor } from '@ckeditor/ckeditor5-core';

export class Plugin {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {}
}

mix(Plugin, ObservableMixin);
