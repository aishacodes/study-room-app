import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { uploadFile } from '@/services/studyroom.services';
import AddStudyRoom from '@/components/organisms/AddStudyRoom';

vi.mock('@/services/studyroom.services', () => ({
  createStudyRoom: vi.fn(),
  fetchCoordinates: vi.fn(),
  uploadFile: vi.fn(),
}));

describe('AddStudyRoom Component', () => {
  const mockOnClose = vi.fn();
  const mockImageURL = 'https://studypicture.com/image.jpg';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the modal and form fields correctly', () => {
    render(<AddStudyRoom isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText(/Add New Study Room/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Capacity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Opening hour/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Closing hour/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload room picture/i)).toBeInTheDocument();
  });

  it('calls onClose when the Cancel button is clicked', () => {
    render(<AddStudyRoom isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText(/Cancel/i));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('uploads an image and displays the preview', async () => {
    vi.mocked(uploadFile).mockResolvedValue(mockImageURL);

    render(<AddStudyRoom isOpen={true} onClose={mockOnClose} />);

    const fileInput = screen.getByLabelText(/Upload room picture/i);
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(uploadFile).toHaveBeenCalledWith(file);
      const img = screen.getByAltText('Uploaded');
      expect(img).toHaveAttribute('src');
      expect(img.getAttribute('src')).toContain(
        encodeURIComponent(mockImageURL)
      );
    });
  });
});
