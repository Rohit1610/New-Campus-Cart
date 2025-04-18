// components/StatusBadge.tsx
interface StatusBadgeProps {
    status: string;
  }
  
  export const StatusBadge = ({ status }: StatusBadgeProps) => {
    let badgeColor = 'gray'; // Default color
    let textColor = 'white'; // Default text color
  
    switch (status) {
      case 'Pending':
        badgeColor = 'yellow';
        break;
      case 'Shipped':
        badgeColor = 'blue';
        break;
      case 'Delivered':
        badgeColor = 'green';
        break;
      case 'Cancelled':
        badgeColor = 'red';
        break;
      default:
        badgeColor = 'gray';
    }
  
    return (
      <span
        className={`px-3 py-1 text-sm font-semibold text-${textColor} bg-${badgeColor}-100 rounded-full`}
      >
        {status}
      </span>
    );
  };
  