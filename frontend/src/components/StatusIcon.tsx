// components/StatusIcon.tsx
interface StatusIconProps {
    status: string;
  }
  
  export const StatusIcon = ({ status }: StatusIconProps) => {
    let color = 'gray'; // Default color
  
    switch (status) {
      case 'Pending':
        color = 'yellow';
        break;
      case 'Shipped':
        color = 'blue';
        break;
      case 'Delivered':
        color = 'green';
        break;
      case 'Cancelled':
        color = 'red';
        break;
      default:
        color = 'gray';
    }
  
    return (
      <div
        className={`w-3 h-3 rounded-full bg-${color}-500`}
        title={status} // Tooltip showing the status name
      ></div>
    );
  };
  