import { render, screen } from '@testing-library/react';
import PhotoCard from '../PhotoCard';

// Mock the child components
jest.mock('../PhotoCardInfo', () => ({
  __esModule: true,
  default: ({ card, type }) => (
    <div data-testid="photo-card-info">
      PhotoCardInfo: {type}
    </div>
  ),
}));

jest.mock('../../label/GradeLabel', () => ({
  __esModule: true,
  default: ({ grade }) => <span data-testid="grade-label">{grade}</span>,
}));

describe('PhotoCard', () => {
  const mockCard = {
    id: 1,
    title: 'Test Photo Card',
    grade: 'RARE',
    genre: '풍경',
    author: 'Test Author',
    price: 100,
    remain: 5,
    total: 10,
  };

  const defaultImageSize = { width: 360, height: 270 };

  describe('Rendering', () => {
    it('should render card with all basic elements', () => {
      render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      
      expect(screen.getByText('Test Photo Card')).toBeInTheDocument();
      expect(screen.getByText('풍경')).toBeInTheDocument();
      expect(screen.getByText('Test Author')).toBeInTheDocument();
      expect(screen.getByTestId('grade-label')).toBeInTheDocument();
      expect(screen.getByTestId('photo-card-info')).toBeInTheDocument();
    });

    it('should render card image with correct dimensions', () => {
      render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const image = screen.getByAltText('카드 이미지');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('width', '360');
      expect(image).toHaveAttribute('height', '270');
    });

    it('should render logo image', () => {
      render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const logo = screen.getByAltText('로고');
      expect(logo).toBeInTheDocument();
    });

    it('should display card title with ellipsis class', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const titleElement = screen.getByText('Test Photo Card');
      expect(titleElement).toHaveClass('whitespace-nowrap');
      expect(titleElement).toHaveClass('overflow-hidden');
      expect(titleElement).toHaveClass('text-ellipsis');
    });
  });

  describe('Image sizing', () => {
    it('should handle small image size', () => {
      const smallSize = { width: 150, height: 112 };
      render(<PhotoCard card={mockCard} imageSize={smallSize} />);
      const image = screen.getByAltText('카드 이미지');
      expect(image).toHaveAttribute('width', '150');
      expect(image).toHaveAttribute('height', '112');
    });

    it('should handle medium image size', () => {
      const mediumSize = { width: 302, height: 227 };
      render(<PhotoCard card={mockCard} imageSize={mediumSize} />);
      const image = screen.getByAltText('카드 이미지');
      expect(image).toHaveAttribute('width', '302');
      expect(image).toHaveAttribute('height', '227');
    });

    it('should handle large image size', () => {
      const largeSize = { width: 360, height: 270 };
      render(<PhotoCard card={mockCard} imageSize={largeSize} />);
      const image = screen.getByAltText('카드 이미지');
      expect(image).toHaveAttribute('width', '360');
      expect(image).toHaveAttribute('height', '270');
    });
  });

  describe('Type prop', () => {
    it('should default to "remain" type when not specified', () => {
      render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      expect(screen.getByText('PhotoCardInfo: remain')).toBeInTheDocument();
    });

    it('should pass type prop to PhotoCardInfo', () => {
      render(<PhotoCard card={mockCard} type="sell" imageSize={defaultImageSize} />);
      expect(screen.getByText('PhotoCardInfo: sell')).toBeInTheDocument();
    });

    it('should support exchange type', () => {
      render(<PhotoCard card={mockCard} type="exchange" imageSize={defaultImageSize} />);
      expect(screen.getByText('PhotoCardInfo: exchange')).toBeInTheDocument();
    });
  });

  describe('Card content', () => {
    it('should display grade label', () => {
      render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const gradeLabel = screen.getByTestId('grade-label');
      expect(gradeLabel).toHaveTextContent('RARE');
    });

    it('should display genre with correct styling', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const genreElement = screen.getByText('풍경');
      expect(genreElement).toHaveClass('text-gray-300');
    });

    it('should display author with underline', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const authorElement = screen.getByText('Test Author');
      expect(authorElement).toHaveClass('underline');
      expect(authorElement).toHaveClass('underline-offset-2');
    });

    it('should have separator between grade and genre', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const separator = container.querySelector('.border-l-gray-400');
      expect(separator).toBeInTheDocument();
    });
  });

  describe('Responsive styling', () => {
    it('should apply small screen container styles', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const cardContainer = container.firstChild;
      expect(cardContainer).toHaveClass('sm:w-[170px]');
      expect(cardContainer).toHaveClass('sm:p-[10px]');
    });

    it('should apply medium screen container styles', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const cardContainer = container.firstChild;
      expect(cardContainer).toHaveClass('md:w-[342px]');
      expect(cardContainer).toHaveClass('md:h-[517px]');
      expect(cardContainer).toHaveClass('md:p-[20px]');
    });

    it('should apply large screen container styles', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const cardContainer = container.firstChild;
      expect(cardContainer).toHaveClass('lg:w-[440px]');
      expect(cardContainer).toHaveClass('lg:h-[600px]');
      expect(cardContainer).toHaveClass('lg:p-[40px]');
    });

    it('should hide logo on small screens', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const logo = screen.getByAltText('로고');
      expect(logo).toHaveClass('sm:hidden');
    });

    it('should show logo on medium and large screens', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const logo = screen.getByAltText('로고');
      expect(logo).toHaveClass('md:block');
      expect(logo).toHaveClass('lg:block');
    });
  });

  describe('Layout structure', () => {
    it('should have flex column layout', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const cardContainer = container.firstChild;
      expect(cardContainer).toHaveClass('flex');
      expect(cardContainer).toHaveClass('flex-col');
      expect(cardContainer).toHaveClass('items-center');
    });

    it('should have border and background', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const cardContainer = container.firstChild;
      expect(cardContainer).toHaveClass('bg-gray-500');
      expect(cardContainer).toHaveClass('border');
      expect(cardContainer).toHaveClass('border-gray-400');
      expect(cardContainer).toHaveClass('rounded-[2px]');
    });

    it('should position logo absolutely at bottom', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const logo = screen.getByAltText('로고');
      expect(logo).toHaveClass('absolute');
      expect(logo).toHaveClass('bottom-10');
    });
  });

  describe('Edge cases', () => {
    it('should handle very long titles', () => {
      const longCard = {
        ...mockCard,
        title: 'This is a very long title that should be truncated with ellipsis when displayed',
      };
      render(<PhotoCard card={longCard} imageSize={defaultImageSize} />);
      expect(screen.getByText(longCard.title)).toBeInTheDocument();
    });

    it('should handle missing imageSize prop', () => {
      const { container } = render(<PhotoCard card={mockCard} imageSize={undefined} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle empty card data', () => {
      const emptyCard = {
        title: '',
        grade: '',
        genre: '',
        author: '',
      };
      render(<PhotoCard card={emptyCard} imageSize={defaultImageSize} />);
      expect(screen.getByAltText('카드 이미지')).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      const specialCard = {
        ...mockCard,
        title: 'Test <>&"\'',
      };
      render(<PhotoCard card={specialCard} imageSize={defaultImageSize} />);
      expect(screen.getByText('Test <>&"\'')).toBeInTheDocument();
    });
  });

  describe('Component integration', () => {
    it('should pass correct props to GradeLabel', () => {
      render(<PhotoCard card={mockCard} imageSize={defaultImageSize} />);
      const gradeLabel = screen.getByTestId('grade-label');
      expect(gradeLabel).toHaveTextContent(mockCard.grade);
    });

    it('should pass correct props to PhotoCardInfo', () => {
      render(<PhotoCard card={mockCard} type="sell" imageSize={defaultImageSize} />);
      expect(screen.getByTestId('photo-card-info')).toBeInTheDocument();
      expect(screen.getByText('PhotoCardInfo: sell')).toBeInTheDocument();
    });
  });
});