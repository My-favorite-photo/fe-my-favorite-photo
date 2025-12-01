import { render, screen } from '@testing-library/react';
import SaleStatusLabel from '../SaleStatusLabel';

describe('SaleStatusLabel', () => {
  describe('Status rendering', () => {
    it('should render AVAILABLE status', () => {
      render(<SaleStatusLabel status="AVAILABLE" />);
      expect(screen.getByText('판매 중')).toBeInTheDocument();
    });

    it('should render EXCHANGE_OFFER status', () => {
      render(<SaleStatusLabel status="EXCHANGE_OFFER" />);
      expect(screen.getByText('교환 제시 대기 중')).toBeInTheDocument();
    });

    it('should render SOLD_OUT status', () => {
      render(<SaleStatusLabel status="SOLD_OUT" />);
      expect(screen.getByText('판매 완료')).toBeInTheDocument();
    });
  });

  describe('Status colors', () => {
    it('should apply white color to AVAILABLE status', () => {
      const { container } = render(<SaleStatusLabel status="AVAILABLE" />);
      const text = container.querySelector('p');
      expect(text).toHaveClass('text-white');
    });

    it('should apply main color to EXCHANGE_OFFER status', () => {
      const { container } = render(<SaleStatusLabel status="EXCHANGE_OFFER" />);
      const text = container.querySelector('p');
      expect(text).toHaveClass('text-main');
    });

    it('should apply gray color to SOLD_OUT status', () => {
      const { container } = render(<SaleStatusLabel status="SOLD_OUT" />);
      const text = container.querySelector('p');
      expect(text).toHaveClass('text-gray-300');
    });
  });

  describe('Responsive styling', () => {
    it('should include small screen styles', () => {
      const { container } = render(<SaleStatusLabel status="AVAILABLE" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('sm:px-[8px]');
      expect(wrapper).toHaveClass('sm:py-[4px]');
      expect(wrapper).toHaveClass('sm:text-[10px]');
    });

    it('should include medium screen styles', () => {
      const { container } = render(<SaleStatusLabel status="AVAILABLE" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('md:px-[8px]');
      expect(wrapper).toHaveClass('md:py-[4px]');
      expect(wrapper).toHaveClass('md:text-[14px]');
    });

    it('should include large screen styles', () => {
      const { container } = render(<SaleStatusLabel status="AVAILABLE" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('lg:px-[10px]');
      expect(wrapper).toHaveClass('lg:py-[4px]');
      expect(wrapper).toHaveClass('lg:text-[16px]');
    });
  });

  describe('Layout and structure', () => {
    it('should apply consistent base styles', () => {
      const { container } = render(<SaleStatusLabel status="AVAILABLE" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('bg-black/50');
      expect(wrapper).toHaveClass('w-max');
      expect(wrapper).toHaveClass('inline-flex');
      expect(wrapper).toHaveClass('items-center');
      expect(wrapper).toHaveClass('gap-[10px]');
      expect(wrapper).toHaveClass('rounded-[2px]');
      expect(wrapper).toHaveClass('font-normal');
    });

    it('should contain a paragraph element', () => {
      const { container } = render(<SaleStatusLabel status="AVAILABLE" />);
      expect(container.querySelector('p')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined status', () => {
      const { container } = render(<SaleStatusLabel status={undefined} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle null status', () => {
      const { container } = render(<SaleStatusLabel status={null} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle unknown status values', () => {
      const { container } = render(<SaleStatusLabel status="UNKNOWN" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle empty string status', () => {
      const { container } = render(<SaleStatusLabel status="" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Status text mapping', () => {
    it('should map all valid statuses correctly', () => {
      const statusMap = [
        { status: 'AVAILABLE', text: '판매 중' },
        { status: 'EXCHANGE_OFFER', text: '교환 제시 대기 중' },
        { status: 'SOLD_OUT', text: '판매 완료' },
      ];

      statusMap.forEach(({ status, text }) => {
        const { rerender } = render(<SaleStatusLabel status={status} />);
        expect(screen.getByText(text)).toBeInTheDocument();
        rerender(<></>);
      });
    });
  });

  describe('Accessibility', () => {
    it('should use semantic paragraph tag for text', () => {
      const { container } = render(<SaleStatusLabel status="AVAILABLE" />);
      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph.tagName).toBe('P');
    });

    it('should maintain consistent structure across statuses', () => {
      const statuses = ['AVAILABLE', 'EXCHANGE_OFFER', 'SOLD_OUT'];
      statuses.forEach((status) => {
        const { container } = render(<SaleStatusLabel status={status} />);
        expect(container.querySelector('div > p')).toBeInTheDocument();
      });
    });
  });
});