import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const CKEditorComponent: React.FC = () => {
  return (
    <div>
      <h2>CKEditor Example</h2>
      <CKEditor editor={ClassicEditor} data="<p>Hello from CKEditor!</p>" />
    </div>
  );
};

export default CKEditorComponent;
