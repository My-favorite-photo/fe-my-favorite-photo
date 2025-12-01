import { render, screen } from '@testing-library/react';
import GradeLabel from '../GradeLabel';

describe('GradeLabel', () => {
  describe('Grade rendering', () => {
    it('should render COMMON grade with correct styling', () => {
      render(<GradeLabel grade="COMMON" />);
      const element = screen.getByText('COMMON');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('text-main');
    });

    it('should render RARE grade with correct styling', () => {
      render(<GradeLabel grade="RARE" />);
      const element = screen.getByText('RARE');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('text-blue');
    });

    it('should render SUPER_RARE grade with correct styling and formatting', () => {
      render(<GradeLabel grade="SUPER_RARE" />);
      const element = screen.getByText('SUPER RARE');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('text-purple');
    });

    it('should render LEGENDARY grade with correct styling', () => {
      render(<GradeLabel grade="LEGENDARY" />);
      const element = screen.getByText('LEGENDARY');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('text-pink');
    });
  });

  describe('Size variations', () => {
    it('should apply bold text when size prop is provided', () => {
      const { container } = render(<GradeLabel grade="COMMON" size="md" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('text-[16px]');
      expect(wrapper).toHaveClass('font-bold');
    });

    it('should apply responsive text classes when size prop is not provided', () => {
      const { container } = render(<GradeLabel grade="COMMON" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('sm:text-[10px]');
      expect(wrapper).toHaveClass('sm:font-light');
      expect(wrapper).toHaveClass('md:text-[16px]');
      expect(wrapper).toHaveClass('lg:text-[16px]');
    });

    it('should handle size prop as truthy value', () => {
      const { container } = render(<GradeLabel grade="RARE" size={true} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('text-[16px]');
      expect(wrapper).toHaveClass('font-bold');
    });
  });

  describe('Text formatting', () => {
    it('should replace underscores with spaces', () => {
      render(<GradeLabel grade="SUPER_RARE" />);
      expect(screen.getByText('SUPER RARE')).toBeInTheDocument();
      expect(screen.queryByText('SUPER_RARE')).not.toBeInTheDocument();
    });

    it('should handle grades without underscores', () => {
      render(<GradeLabel grade="COMMON" />);
      expect(screen.getByText('COMMON')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined grade gracefully', () => {
      const { container } = render(<GradeLabel grade={undefined} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle empty string grade', () => {
      render(<GradeLabel grade="" />);
      expect(screen.getByText('')).toBeInTheDocument();
    });

    it('should handle unknown grade values', () => {
      render(<GradeLabel grade="UNKNOWN" />);
      expect(screen.getByText('UNKNOWN')).toBeInTheDocument();
    });

    it('should handle multiple underscores in grade name', () => {
      render(<GradeLabel grade="SUPER_ULTRA_RARE" />);
      expect(screen.getByText('SUPER ULTRA RARE')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render semantic HTML structure', () => {
      const { container } = render(<GradeLabel grade="COMMON" />);
      expect(container.querySelector('div')).toBeInTheDocument();
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('should maintain consistent structure across all grades', () => {
      const grades = ['COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY'];
      grades.forEach((grade) => {
        const { container } = render(<GradeLabel grade={grade} />);
        expect(container.querySelector('div > span')).toBeInTheDocument();
      });
    });
  });
});