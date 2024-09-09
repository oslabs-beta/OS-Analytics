import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { ChartDownloadProps } from '../../../types';
const ChartDownload = ({ chartRef, fileName = 'chart.png' }: ChartDownloadProps) => {
  const handleDownload = () => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;
      const link = document.createElement('a');
      link.href = chartInstance.toBase64Image();
      link.download = fileName;
      link.click();
    }
  };

  return (
    <IconButton onClick={handleDownload} aria-label="download">
      <DownloadIcon />
    </IconButton>
  );
};

export default ChartDownload;
