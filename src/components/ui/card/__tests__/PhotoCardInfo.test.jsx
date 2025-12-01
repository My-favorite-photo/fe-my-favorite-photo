import { render, screen } from '@testing-library/react';
import PhotoCardInfo from '../PhotoCardInfo';

describe('PhotoCardInfo', () => {
  const mockCard = {
    price: 100,
    remain: 5,
    total: 10,
  };

  describe('Type: remain', () => {
    it('should display remaining quantity information', () => {
      render(<PhotoCardInfo card={mockCard} type="remain" />);
      expect(screen.getByText('가격')).toBeInTheDocument();
      expect(screen.getByText('100 P')).toBeInTheDocument();
      expect(screen.getByText('잔여')).toBeInTheDocument();
      expect(screen.getByText('5 / 10')).toBeInTheDocument();
    });

    it('should handle zero remaining cards', () => {
      const card = { ...mockCard, remain: 0 };
      render(<PhotoCardInfo card={card} type="remain" />);
      expect(screen.getByText('0 / 10')).toBeInTheDocument();
    });

    it('should handle all cards remaining', () => {
      const card = { ...mockCard, remain: 10, total: 10 };
      render(<PhotoCardInfo card={card} type="remain" />);
      expect(screen.getByText('10 / 10')).toBeInTheDocument();
    });
  });

  describe('Type: sell', () => {
    it('should display selling quantity information', () => {
      render(<PhotoCardInfo card={mockCard} type="sell" />);
      expect(screen.getByText('가격')).toBeInTheDocument();
      expect(screen.getByText('100 P')).toBeInTheDocument();
      expect(screen.getByText('판매량')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should handle zero sales', () => {
      const card = { ...mockCard, remain: 0 };
      render(<PhotoCardInfo card={card} type="sell" />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should handle high sales numbers', () => {
      const card = { ...mockCard, remain: 999 };
      render(<PhotoCardInfo card={card} type="sell" />);
      expect(screen.getByText('999')).toBeInTheDocument();
    });
  });

  describe('Type: exchange', () => {
    it('should display exchange offer count', () => {
      render(<PhotoCardInfo card={mockCard} type="exchange" />);
      expect(screen.getByText('가격')).toBeInTheDocument();
      expect(screen.getByText('100 P')).toBeInTheDocument();
      expect(screen.getByText('교환 제시')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should handle zero exchange offers', () => {
      const card = { ...mockCard, remain: 0 };
      render(<PhotoCardInfo card={card} type="exchange" />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('Price formatting', () => {
    it('should format price with P suffix', () => {
      render(<PhotoCardInfo card={mockCard} type="remain" />);
      expect(screen.getByText('100 P')).toBeInTheDocument();
    });

    it('should handle zero price', () => {
      const card = { ...mockCard, price: 0 };
      render(<PhotoCardInfo card={card} type="remain" />);
      expect(screen.getByText('0 P')).toBeInTheDocument();
    });

    it('should handle large prices', () => {
      const card = { ...mockCard, price: 999999 };
      render(<PhotoCardInfo card={card} type="remain" />);
      expect(screen.getByText('999999 P')).toBeInTheDocument();
    });

    it('should handle decimal prices', () => {
      const card = { ...mockCard, price: 10.5 };
      render(<PhotoCardInfo card={card} type="remain" />);
      expect(screen.getByText('10.5 P')).toBeInTheDocument();
    });
  });

  describe('Responsive styling', () => {
    it('should apply small screen gap and text size', () => {
      const { container } = render(<PhotoCardInfo card={mockCard} type="remain" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('sm:gap-[5px]');
      expect(wrapper).toHaveClass('sm:text-[10px]');
    });

    it('should apply medium screen gap and text size', () => {
      const { container } = render(<PhotoCardInfo card={mockCard} type="remain" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('md:gap-[10px]');
      expect(wrapper).toHaveClass('md:text-[16px]');
    });

    it('should apply large screen gap and text size', () => {
      const { container } = render(<PhotoCardInfo card={mockCard} type="remain" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('lg:gap-[10px]');
      expect(wrapper).toHaveClass('lg:text-[16px]');
    });
  });

  describe('Layout structure', () => {
    it('should have consistent base styles', () => {
      const { container } = render(<PhotoCardInfo card={mockCard} type="remain" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
      expect(wrapper).toHaveClass('flex');
      expect(wrapper).toHaveClass('flex-col');
    });

    it('should contain two rows of information', () => {
      const { container } = render(<PhotoCardInfo card={mockCard} type="remain" />);
      const rows = container.querySelectorAll('.w-full.flex.justify-between.items-center');
      expect(rows.length).toBeGreaterThanOrEqual(2);
    });

    it('should apply correct text colors', () => {
      const { container } = render(<PhotoCardInfo card={mockCard} type="remain" />);
      const labels = container.querySelectorAll('.text-gray-300');
      const values = container.querySelectorAll('.text-white');
      expect(labels.length).toBeGreaterThan(0);
      expect(values.length).toBeGreaterThan(0);
    });
  });

  describe('Edge cases', () => {
    it('should handle missing card data gracefully', () => {
      const { container } = render(<PhotoCardInfo card={{}} type="remain" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle undefined type with remain as default', () => {
      render(<PhotoCardInfo card={mockCard} />);
      expect(screen.getByText('잔여')).toBeInTheDocument();
    });

    it('should handle invalid type gracefully', () => {
      const { container } = render(<PhotoCardInfo card={mockCard} type="invalid" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle negative values', () => {
      const card = { price: -10, remain: -5, total: 10 };
      render(<PhotoCardInfo card={card} type="remain" />);
      expect(screen.getByText('-10 P')).toBeInTheDocument();
      expect(screen.getByText('-5 / 10')).toBeInTheDocument();
    });
  });

  describe('Type mapping completeness', () => {
    it('should support all three types', () => {
      const types = ['remain', 'sell', 'exchange'];
      types.forEach((type) => {
        const { container } = render(<PhotoCardInfo card={mockCard} type={type} />);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should display different labels for each type', () => {
      const { rerender } = render(<PhotoCardInfo card={mockCard} type="remain" />);
      expect(screen.getByText('잔여')).toBeInTheDocument();

      rerender(<PhotoCardInfo card={mockCard} type="sell" />);
      expect(screen.getByText('판매량')).toBeInTheDocument();

      rerender(<PhotoCardInfo card={mockCard} type="exchange" />);
      expect(screen.getByText('교환 제시')).toBeInTheDocument();
    });
  });
});