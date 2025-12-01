import { render, screen } from '@testing-library/react';
import GradeBox from '../GradeBox';

describe('GradeBox', () => {
  describe('Rendering', () => {
    it('should render grade and count', () => {
      render(<GradeBox grade="COMMON" count={5} />);
      expect(screen.getByText('COMMON')).toBeInTheDocument();
      expect(screen.getByText('5장')).toBeInTheDocument();
    });

    it('should format SUPER_RARE grade with space', () => {
      render(<GradeBox grade="SUPER_RARE" count={3} />);
      expect(screen.getByText('SUPER RARE')).toBeInTheDocument();
    });

    it('should handle zero count', () => {
      render(<GradeBox grade="RARE" count={0} />);
      expect(screen.getByText('0장')).toBeInTheDocument();
    });

    it('should handle large count numbers', () => {
      render(<GradeBox grade="LEGENDARY" count={9999} />);
      expect(screen.getByText('9999장')).toBeInTheDocument();
    });
  });

  describe('Grade styling', () => {
    it('should apply COMMON grade styling', () => {
      const { container } = render(<GradeBox grade="COMMON" count={5} />);
      const box = container.firstChild;
      expect(box).toHaveClass('text-main');
      expect(box).toHaveClass('border-main');
    });

    it('should apply RARE grade styling', () => {
      const { container } = render(<GradeBox grade="RARE" count={5} />);
      const box = container.firstChild;
      expect(box).toHaveClass('text-blue');
      expect(box).toHaveClass('border-blue');
    });

    it('should apply SUPER_RARE grade styling', () => {
      const { container } = render(<GradeBox grade="SUPER_RARE" count={5} />);
      const box = container.firstChild;
      expect(box).toHaveClass('text-purple');
      expect(box).toHaveClass('border-purple');
    });

    it('should apply LEGENDARY grade styling', () => {
      const { container } = render(<GradeBox grade="LEGENDARY" count={5} />);
      const box = container.firstChild;
      expect(box).toHaveClass('text-pink');
      expect(box).toHaveClass('border-pink');
    });
  });

  describe('Responsive sizing', () => {
    it('should include small screen styles', () => {
      const { container } = render(<GradeBox grade="COMMON" count={5} />);
      const box = container.firstChild;
      expect(box).toHaveClass('sm:h-[30px]');
      expect(box).toHaveClass('sm:px-[10px]');
      expect(box).toHaveClass('sm:py-[6px]');
      expect(box).toHaveClass('sm:text-[12px]');
    });

    it('should include medium screen styles', () => {
      const { container } = render(<GradeBox grade="COMMON" count={5} />);
      const box = container.firstChild;
      expect(box).toHaveClass('md:h-[32px]');
      expect(box).toHaveClass('md:px-[10px]');
      expect(box).toHaveClass('md:py-[6px]');
      expect(box).toHaveClass('md:text-[14px]');
    });

    it('should include large screen styles', () => {
      const { container } = render(<GradeBox grade="COMMON" count={5} />);
      const box = container.firstChild;
      expect(box).toHaveClass('lg:h-[40px]');
      expect(box).toHaveClass('lg:px-[20px]');
      expect(box).toHaveClass('lg:py-[8px]');
      expect(box).toHaveClass('lg:text-[16px]');
    });
  });

  describe('Layout and structure', () => {
    it('should apply consistent base styles', () => {
      const { container } = render(<GradeBox grade="COMMON" count={5} />);
      const box = container.firstChild;
      expect(box).toHaveClass('bg-black');
      expect(box).toHaveClass('inline-flex');
      expect(box).toHaveClass('items-center');
      expect(box).toHaveClass('gap-[10px]');
      expect(box).toHaveClass('border-[1px]');
      expect(box).toHaveClass('font-light');
      expect(box).toHaveClass('w-max');
    });

    it('should contain two span elements', () => {
      const { container } = render(<GradeBox grade="COMMON" count={5} />);
      const spans = container.querySelectorAll('span');
      expect(spans).toHaveLength(2);
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined grade', () => {
      const { container } = render(<GradeBox grade={undefined} count={5} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle negative count', () => {
      render(<GradeBox grade="COMMON" count={-1} />);
      expect(screen.getByText('-1장')).toBeInTheDocument();
    });

    it('should handle floating point count', () => {
      render(<GradeBox grade="RARE" count={3.5} />);
      expect(screen.getByText('3.5장')).toBeInTheDocument();
    });

    it('should handle string count', () => {
      render(<GradeBox grade="RARE" count="10" />);
      expect(screen.getByText('10장')).toBeInTheDocument();
    });
  });

  describe('Text formatting', () => {
    it('should replace single underscore with space', () => {
      render(<GradeBox grade="SUPER_RARE" count={2} />);
      expect(screen.getByText('SUPER RARE')).toBeInTheDocument();
    });

    it('should not modify grades without underscores', () => {
      render(<GradeBox grade="LEGENDARY" count={1} />);
      expect(screen.getByText('LEGENDARY')).toBeInTheDocument();
    });
  });
});