import { render } from '@testing-library/react';

import Ckeditor from './ckeditor';

describe('Ckeditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Ckeditor />);
    expect(baseElement).toBeTruthy();
  });
});
